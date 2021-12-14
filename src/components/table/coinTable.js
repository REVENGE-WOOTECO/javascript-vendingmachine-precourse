import table from "./table.js";
import coinTableRow from "./coinTableRow.js";

export default class coinTable extends table {
  constructor({ target, type, id, innerHtml = "", tableHeader = {} }) {
    super({ target, type, id, innerHtml, tableHeader });
  }
  createHeader() {
    super.createHeader();
  }

  update(stateList = []) {
    Object.keys(stateList).forEach((key) => {
      const tr = this.tableRows.find(
        (row) => row.elem.id === `${this.id}-${key}-item`
      );
      if (tr) tr.update({ [key]: stateList[key] });
      else this.tableRows.push(this.createNewRow({ [key]: stateList[key] }));
    });
  }

  createNewRow(state) {
    const tr = new coinTableRow({
      target: this.elem,
      type: "tr",
      id: `${this.id}`,
      key: Object.keys(state)[0],
    });
    tr.update(state);
    return tr;
  }
}
