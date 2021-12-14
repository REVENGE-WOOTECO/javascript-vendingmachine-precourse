import component from "../component.js";
import tableRow from "./tableRow.js";

export default class table extends component {
  constructor({ target, type, id, innerHtml = "", tableHeader = {} }) {
    super({ target, type, id, innerHtml });
    this.id = id;
    this.tableHeader = tableHeader;
    this.tableRows = [];
    this.createHeader();
  }
  createHeader() {
    const keys = Object.keys(this.tableHeader);
    keys.map((key) => {
      new component({
        target: this.elem,
        type: "th",
        id: `${this.id}-${key}-header`,
        innerHtml: `${this.tableHeader[key]}`,
      });
    });
  }

  update(stateList = [], needButton = false) {
    // stateList = 로컬스토리지 전체 데이터
    if (!stateList || stateList.length === 0) {
      return;
    }
    stateList.forEach((data) => {
      const key = data.id;
      const tr = this.tableRows.find(
        (row) => row.elem.id === `${this.id}-item-${key}`
      );
      if (tr) tr.update(data, needButton);
      else this.tableRows.push(this.createNewRow(data, needButton));
    });
  }

  createNewRow(state, needButton) {
    const tr = new tableRow({
      target: this.elem,
      type: "tr",
      id: `${this.id}`,
      tableHeader: this.tableHeader,
      key: state.id,
    });
    tr.update(state, needButton);
    return tr;
  }
}
