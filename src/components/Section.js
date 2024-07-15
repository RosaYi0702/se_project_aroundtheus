export default class Section {
  constructor({ renderer }, classSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(classSelector);
  }

  renderItems(elements) {
    elements.forEach((item) => {
      this._renderer(item);
    });
  }

  addItem(element) {
    this._container.prepend(element);
  }
}
