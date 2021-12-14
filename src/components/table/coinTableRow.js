import component from "../component.js";

export default class coinTableRow extends component {
  constructor({ target, type, id, innerHtml = "", key }) {
    super({ target, type, id: `${id}-${key}-item`, innerHtml });
    this.id = id;
    this.key = key;
  }

  update(state) {
    if (!this.priceTd) this.createNewRow();
    this.priceTd.elem.innerText = `${state[this.key]}개`;
  }

  createNewRow() {
    new component({
      target: this.elem,
      type: "td",
      id: `${this.getMainId()}-td`,
      innerHtml: `${this.key}원`,
    });
    this.priceTd = new component({
      target: this.elem,
      type: "td",
      id: this.getMainId(),
    });
  }
  getMainId() {
    return `${this.id}-${this.key}-quantity`;
  }
}
