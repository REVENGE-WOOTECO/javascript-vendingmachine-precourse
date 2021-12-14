import component from "./component.js";

export default class header {
  constructor(target) {
    this.target = target;
    this.createHeader();
    this.createTitle();
    this.createButtons();
  }
  createHeader() {
    this.Header = new component({
      target: this.target,
      type: "header",
      id: "header",
    });
  }
  createTitle() {
    this.title = new component({
      target: this.Header.elem,
      type: "div",
      id: "header-title",
      innerHtml: `🥤 자판기 🥤`,
    });
  }
  createButtons() {
    this.productAddMenu = new component({
      target: this.Header.elem,
      type: "button",
      id: "product-add-menu",
      innerHtml: "상품 관리",
    });
    this.machineManageMenu = new component({
      target: this.Header.elem,
      type: "button",
      id: "vending-machine-manage-menu",
      innerHtml: "잔돈 충전",
    });
    this.purchaseMenu = new component({
      target: this.Header.elem,
      type: "button",
      id: "product-purchase-menu",
      innerHtml: "상품 구매",
    });
  }

  addEvent({
    onProductAddClicked,
    onManageMenuClicked,
    onPurchageMenuClicked,
  }) {
    this.productAddMenu.addEvent("click", onProductAddClicked);
    this.machineManageMenu.addEvent("click", onManageMenuClicked);
    this.purchaseMenu.addEvent("click", onPurchageMenuClicked);
  }
}

// ${this.#machineManageMenu.render()}
// ${this.#productAddMenu.render()}
// ${this.#purchaseMenu.render()}
