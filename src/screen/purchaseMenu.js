import component from "../components/component.js";
import Input from "../components/input.js";
import Table from "../components/table/table.js";
import coinTable from "../components/table/coinTable.js";
import productStore from "../store/productStore.js";
import { ACTION } from "../store/action.js";
import { machineChargeStore, userChargeStore } from "../store/chargeStore.js";
import { concatCoin, divideCoin, settlement } from "../utils/coinDivider.js";
import menu from "./menu.js";

const CHARGE_ID = "charge";
const PURCHASE_ID = "product-purchase";
const COIN_ID = "coin";

export default class purchaseMenu extends menu {
  constructor(target) {
    super(target);
    this.createElemnt();
    this.subscribe();
  }
  createElemnt() {
    this.createCoinInputSection(this.container.elem);
    this.createProductStatusSection(this.container.elem);
    this.createCoinStatusSection(this.container.elem);
  }
  createCoinInputSection(target) {
    this.addSection = new component({
      target: target,
      type: "section",
      id: `${CHARGE_ID}-section`,
    });
    this.createInsertTitle(this.addSection.elem);
    this.createInsertForm(this.addSection.elem);
    this.createInsertInput(this.insertForm.elem);
    this.createInsertButton(this.insertForm.elem);
    this.createInsertText(this.addSection.elem);
  }
  createInsertTitle(target) {
    this.insertTitle = new component({
      target: target,
      type: "div",
      id: `${CHARGE_ID}-title`,
      innerHtml: "금액 투입",
    });
  }
  createInsertForm(target) {
    this.insertForm = new component({
      target: target,
      type: "form",
      id: `${CHARGE_ID}-form`,
    });
  }

  createInsertInput(target) {
    this.insertInput = new Input({
      target: target,
      type: "input",
      id: `${CHARGE_ID}-input`,
      placeholder: "투입할 금액",
      inputType: "number",
    });
  }
  createInsertButton(target) {
    this.insertButton = new component({
      target: target,
      type: "button",
      id: `${CHARGE_ID}-button`,
      innerHtml: "투입하기",
    });
    this.insertButton.addEvent("click", () =>
      this.insertCoin(Number(this.insertInput.getText()))
    );
  }
  createInsertText(target) {
    this.insertAmountLabel = new component({
      target: target,
      type: "span",
      id: `${CHARGE_ID}-amount-label`,
      innerHtml: "투입한 금액:",
    });
    this.insertAmount = new component({
      target: target,
      type: "span",
      id: `${CHARGE_ID}-amount`,
    });
  }

  createProductStatusSection(target) {
    this.productStatusSection = new component({
      target: target,
      type: "section",
      id: `${PURCHASE_ID}-section`,
    });
    this.createProductStatusTitle(this.productStatusSection.elem);
    this.createProductStatusTable(this.productStatusSection.elem);
  }

  createProductStatusTitle(target) {
    this.productStatusTitle = new component({
      target: target,
      type: "div",
      id: `${PURCHASE_ID}-title`,
      innerHtml: "구매할 수 있는 상품 현황",
    });
  }

  createProductStatusTable(target) {
    this.productStatusTable = new Table({
      target: target,
      type: "table",
      id: `${PURCHASE_ID}`,
      tableHeader: {
        name: "상품명",
        price: "가격",
        quantity: "수량",
        buy: "구매",
      },
    });
  }

  createCoinStatusSection(target) {
    this.coinStatusSection = new component({
      target: target,
      type: "section",
      id: `${COIN_ID}-section`,
    });
    this.createCoinStatusTitle(this.coinStatusSection.elem);
    this.createCoinStatusButton(this.coinStatusSection.elem);
    this.createCoinStatusTable(this.coinStatusSection.elem);
  }
  createCoinStatusTitle(target) {
    this.productStatusTitle = new component({
      target: target,
      type: "div",
      id: `${COIN_ID}-title`,
      innerHtml: "잔돈",
    });
  }
  createCoinStatusButton(target) {
    this.coinStatusButton = new component({
      target: target,
      type: "button",
      id: `${COIN_ID}-button`,
      innerHtml: "반환하기",
    });
    this.coinStatusButton.addEvent("click", () => this.showCoinTable());
  }

  createCoinStatusTable(target) {
    this.coinStatusTable = new coinTable({
      target: target,
      type: "table",
      id: `${COIN_ID}`,
      tableHeader: {
        name: "동전",
        price: "개수",
      },
    });
  }
  insertCoin(inputCoin) {
    userChargeStore.dispatch({
      type: ACTION.ADD,
      payload: inputCoin,
    });
  }
  showInsertCoin() {
    this.insertAmount.setText(userChargeStore.getState());
  }
  showProductStatusTable() {
    this.productStatusTable.update(productStore.getState(), true);
  }
  showCoinStatusTable(state) {
    this.coinStatusTable.update(state);
  }
  showCoinTable() {
    const userCoin = divideCoin(userChargeStore.getState());
    const machineCoin = divideCoin(machineChargeStore.getState());
    const { base, target, result } = settlement(machineCoin, userCoin);
    machineChargeStore.dispatch({
      type: ACTION.UPDATE,
      payload: concatCoin(base),
    });
    userChargeStore.dispatch({
      type: ACTION.UPDATE,
      payload: concatCoin(target),
    });
    this.showCoinStatusTable(result);
  }
  subscribe() {
    productStore.subscribeAll([ACTION.UPDATE, ACTION.PURCHASE], () => {
      this.showInsertCoin();
      this.showProductStatusTable();
    });
    userChargeStore.subscribeAll(
      [ACTION.ADD, ACTION.UPDATE, ACTION.PURCHASE],
      () => {
        this.showInsertCoin();
      }
    );
    machineChargeStore.subscribe(ACTION.UPDATE, () => this.showInsertCoin());
  }
}
