export default class Section {
  constructor({ items, renderer }, classSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(classSelector);
    if (!this._items) {
      console.error("Items is undefined or null"); // Debug line
    }
  }

  renderItems() {
    if (!Array.isArray(this._items)) {
      console.error("Items is not an array"); // Debug line
      return;
    }
    this._items.forEach((item) => {
      this._renderer(item);
    });
  }

  addItem(element) {
    this._container.prepend(element);
  }
}
