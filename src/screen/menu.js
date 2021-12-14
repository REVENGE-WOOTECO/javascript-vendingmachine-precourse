import component from "../components/component.js";
import { ACTION } from "../store/action.js";

export default class menu {
  constructor(target) {
    this.target = target;
    this.createContainer();
    this.subscribe();
    this.hide();
  }
  createContainer() {
    this.container = new component({
      target: this.target,
      type: "section",
      id: `section`,
    });
  }
  createElemnt() {}
  show() {
    this.target.appendChild(this.container.elem);
  }
  hide() {
    this.target.removeChild(this.container.elem);
  }
  subscribe() {}
}
