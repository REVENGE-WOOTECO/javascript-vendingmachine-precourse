export default class component {
  constructor({ target, type, id, innerHtml = "" }) {
    this.target = target;
    this.elem = document.createElement(type);
    this.elem.id = id;
    this.elem.innerHTML = innerHtml;
    this.target.appendChild(this.elem);
  }

  addEvent(eventType, callback) {
    this.elem.addEventListener(eventType, (event) => {
      event.preventDefault();
      callback();
    });
  }
  setText(newText) {
    this.elem.innerHTML = newText;
  }
  getText() {
    return this.elem.value;
  }
}
