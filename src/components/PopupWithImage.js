import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super({ popupSelector });
    this._cardImage = this._popupElement.querySelector(".modal__exhibit-image");
  }

  // open(data) {
  open(name, link) {
    this._cardImage.src = link;
    this._cardImage.alt = name;
    this._popupElement.querySelector(".modal__exhibit-image-name").textContent =
      name;
    super.open();
  }
}
