import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor({ popupSelector }) {
    super({ popupSelector });
    this._popupButton = this._popupElement.querySelector(".modal__button");
  }

  renderLoading(isLoading) {
    if (isLoading) {
      this._popupButton.textContent = "Deleting...";
    } else {
      this._popupButton.textContent = "Yes";
    }
  }

  confirmDelete(apiCheck) {
    this._handleFormSubmit = apiCheck;
  }
  setEventListeners() {
    super.setEventListeners();
    this._popupButton.addEventListener("click", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit();
    });
  }
}
