import component from "./component.js";

export default class input extends component {
  constructor({
    target,
    type,
    id,
    innerHtml = "",
    inputType,
    placeholder = "",
  }) {
    super({ target, type, id, innerHtml });
    this.elem.type = inputType;
    this.elem.placeholder = placeholder;
  }
}
