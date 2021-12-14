import Header from "./components/header.js";
import purchaseMenu from "./screen/purchaseMenu.js";
import productAddMenu from "./screen/productAddMenu.js";
import chargeMenu from "./screen/chargeMenu.js";
import productStore from "./store/productStore.js";
import { machineChargeStore, userChargeStore } from "./store/chargeStore.js";
import { ACTION } from "./store/action.js";

export default class VendingMachine {
  constructor() {
    this.app = document.querySelector("#app");
    this.createHeader();
    this.createMenu();
    this.init();
  }
  createHeader() {
    this.header = new Header(this.app);
    this.header.addEvent({
      onProductAddClicked: () => this.showMenu(this.productAddMenu),
      onManageMenuClicked: () => this.showMenu(this.chargeMenu),
      onPurchageMenuClicked: () => this.showMenu(this.purchaseMenu),
    });
  }
  createMenu() {
    this.productAddMenu = new productAddMenu(this.app);
    this.purchaseMenu = new purchaseMenu(this.app);
    this.chargeMenu = new chargeMenu(this.app);
  }
  init() {
    if (userChargeStore.getState() === null) {
      userChargeStore.dispatch({ type: ACTION.UPDATE, payload: 0 });
    }
    if (machineChargeStore.getState() === null) {
      machineChargeStore.dispatch({ type: ACTION.UPDATE, payload: 0 });
    }
    productStore.publish(ACTION.UPDATE);
    machineChargeStore.publish(ACTION.UPDATE);
    userChargeStore.publish(ACTION.UPDATE);
    this.showMenu(this.productAddMenu);
  }
  showMenu(node) {
    if (this.currentDisplayMenu) this.currentDisplayMenu.hide();
    this.currentDisplayMenu = node;
    this.currentDisplayMenu.show();
  }
}

const machine = new VendingMachine();
