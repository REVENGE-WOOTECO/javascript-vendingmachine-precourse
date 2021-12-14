import component from "../components/component.js";
import Input from "../components/input.js";
import coinTable from "../components/table/coinTable.js";
import { ACTION } from "../store/action.js";
import { machineChargeStore } from "../store/chargeStore.js";
import { divideCoin } from "../utils/coinDivider.js";
import menu from "./menu.js";

const CHARGE_ID = "vending-machine-charge";
const COIN_ID = "vending-machine-coin";

export default class chargeMenu extends menu {
  constructor(target) {
    super(target);
    this.createElemnt();
    this.subscribe();
  }
  createElemnt() {
    this.createCoinInputSection(this.container.elem);
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
      innerHtml: "자판기 동전 충전하기",
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
      placeholder: "자판기가 보유할 금액",
      inputType: "number",
    });
  }
  createInsertButton(target) {
    this.insertButton = new component({
      target: target,
      type: "button",
      id: `${CHARGE_ID}-button`,
      innerHtml: "충전하기",
    });
    this.insertButton.addEvent("click", () => {
      this.insertCoin(Number(this.insertInput.getText()));
    });
  }
  createInsertText(target) {
    this.insertAmountLabel = new component({
      target: target,
      type: "span",
      id: `${CHARGE_ID}-amount-label`,
      innerHtml: "보유 금액:",
    });
    this.insertAmount = new component({
      target: target,
      type: "span",
      id: `${CHARGE_ID}-amount`,
    });
  }

  createCoinStatusSection(target) {
    this.coinStatusSection = new component({
      target: target,
      type: "section",
      id: `${COIN_ID}-section`,
    });
    this.createCoinStatusTitle(this.coinStatusSection.elem);
    this.createCoinStatusTable(this.coinStatusSection.elem);
  }
  createCoinStatusTitle(target) {
    this.productStatusTitle = new component({
      target: target,
      type: "div",
      id: `${COIN_ID}-title`,
      innerHtml: "자판기가 보유한 동전",
    });
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
    machineChargeStore.dispatch({
      type: ACTION.ADD,
      payload: inputCoin,
    });
    this.showCoinTable();
  }
  showInsertCoin() {
    this.insertAmount.setText(machineChargeStore.getState());
  }
  showCoinTable() {
    this.coinStatusTable.update(divideCoin(machineChargeStore.getState()));
  }
  subscribe() {
    machineChargeStore.subscribeAll([ACTION.ADD, ACTION.UPDATE], () => {
      this.showInsertCoin();
      this.showCoinTable();
    });
  }
}
