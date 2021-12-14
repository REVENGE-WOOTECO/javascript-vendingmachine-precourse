import productStore from "../../store/productStore.js";
import component from "../component.js";
import { ACTION } from "../../store/action.js";
import { userChargeStore } from "../../store/chargeStore.js";

export default class tableRow extends component {
  constructor({ target, type, id, innerHtml = "", tableHeader = "", key }) {
    super({ target, type, id: `${id}-item-${key}`, innerHtml });
    this.id = id;
    this.key = key;
    this.headerKeys = Object.keys(tableHeader);
    this.rowElems = [];
    this.elem.classList.add(`${id}-item`);
  }

  update(state, needButton = false) {
    if (this.rowElems.length > 0 && typeof state === "object") {
      state.getStateList().map((item, index) => {
        const td = this.rowElems.find(
          (row) => row.elem.id === this.getMainId(index)
        );
        td.elem.setAttribute(this.getDataId(index), item);
        td.elem.innerText = td.elem.getAttribute(this.getDataId(index));
      });
    } else {
      this.createNewRow(state);
      if (needButton) this.createNewButton(this.key);
    }
  }

  createNewRow(state) {
    state.getStateList().map((item, index) => {
      const td = new component({
        target: this.elem,
        type: "td",
        id: this.getMainId(index),
        innerHtml: `${item}`,
      });
      // dataset 속성 추가
      td.elem.setAttribute(this.getDataId(index), item);
      td.elem.classList.add(`${this.id}-${this.headerKeys[index]}`);
      this.rowElems = [...this.rowElems, td];
    });
  }
  createNewButton(id) {
    const tdButton = new component({
      target: this.elem,
      type: "button",
      id: `${this.id}-${this.key}-button`,
      innerHtml: "구매하기",
    });
    tdButton.elem.classList.add("purchase-button");
    tdButton.addEvent("click", () => {
      const oldProduct = productStore.getState().find((p) => p.getId() === id);
      if (userChargeStore.getState() < oldProduct.price) {
        return;
      }
      productStore.dispatch({
        type: ACTION.PURCHASE,
        payload: id,
      });
      const newProduct = productStore.getState().find((p) => p.getId() === id);

      if (oldProduct.quantity !== newProduct.quantity) {
        userChargeStore.dispatch({
          type: ACTION.ADD,
          payload: -newProduct.price,
        });
        this.update(newProduct);
      }
    });
  }

  getMainId(index) {
    return `${this.id}-${this.headerKeys[index]}-${this.key}`;
  }
  getDataId(index) {
    return `data-product-${this.headerKeys[index]}`;
  }
}
