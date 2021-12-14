import component from "../components/component.js";
import input from "../components/input.js";
import table from "../components/table/table.js";
import productStore from "../store/productStore.js";
import { ACTION } from "../store/action.js";
import menu from "./menu.js";
import { product } from "../product.js";

export default class productAddMenu extends menu {
  constructor(target) {
    super(target);
    this.createElemnt();
    this.subscribe();
  }
  createElemnt() {
    this.createProductAddSection(this.container.elem);
    this.createProductStatusSection(this.container.elem);
  }
  createProductAddSection(target) {
    this.addSection = new component({
      target: target,
      type: "section",
      id: "product-add-section",
    });
    this.createTitle(this.addSection.elem);
    this.createForm(this.addSection.elem);
    this.createInput(this.form.elem);
    this.createButton(this.form.elem);
  }
  createForm(target) {
    this.form = new component({
      target: target,
      type: "form",
      id: "product-add-form",
    });
  }
  createTitle(target) {
    this.title = new component({
      target: target,
      type: "div",
      id: "product-add-title",
      innerHtml: "상품 추가하기",
    });
  }
  createInput(target) {
    this.name = new input({
      target: target,
      type: "input",
      id: "product-name-input",
      innerHtml: "상품명",
      placeholder: "상품명",
      inputType: "text",
    });
    this.price = new input({
      target: target,
      type: "input",
      id: "product-price-input",
      innerHtml: "가격",
      placeholder: "가격",
      inputType: "number",
    });
    this.quantity = new input({
      target: target,
      type: "input",
      id: "product-quantity-input",
      innerHtml: "수량",
      placeholder: "수량",
      inputType: "number",
    });
  }
  createButton(target) {
    this.addButton = new component({
      target: target,
      type: "button",
      id: "product-add-button",
      innerHtml: "추가하기",
    });
    this.addButton.addEvent("click", () => this.addProduct());
  }
  createProductStatusSection(target) {
    this.statusSection = new component({
      target: target,
      type: "section",
      id: "product-add-status-section",
    });
    this.createStatusTitle(this.statusSection.elem);
    this.createTable(this.statusSection.elem);
  }
  createStatusTitle(target) {
    this.title = new component({
      target: target,
      type: "div",
      id: "product-add-title",
      innerHtml: "상품 현황",
    });
  }
  createTable(target) {
    this.table = new table({
      target: target,
      type: "table",
      id: "product-manage",
      tableHeader: { name: "상품명", price: "가격", quantity: "수량" },
    });
  }
  addProduct() {
    if (this.name.elem.value) {
      productStore.dispatch({
        type: ACTION.UPDATE,
        payload: new product(
          this.name.elem.value,
          this.price.elem.value,
          this.quantity.elem.value
        ),
      });
    }
  }

  subscribe() {
    productStore.subscribeAll([ACTION.UPDATE, ACTION.PURCHASE], () =>
      this.table.update(productStore.getState())
    );
  }
}
