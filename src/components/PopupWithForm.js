import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super({ popupSelector });
    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._popupInputs = this._popupForm.querySelectorAll(".modal__input");
    this._popupButton = this._popupForm.querySelector(".modal__button");
    this._handleFormSubmit = handleFormSubmit;
    this._submitBtnText = this._popupButton.textContent;
  }

  renderLoading(isLoading, loadingText = "Saving...") {
    if (isLoading) {
      this._popupButton.textContent = loadingText;
    } else {
      this._popupButton.textContent = this._submitBtnText;
    }
  }

  _getInputValues() {
    const formValues = {};

    this._popupInputs.forEach((input) => {
      formValues[input.name] = input.value;
    });
    console.log("Form Input Values:", formValues);
    return formValues;
  }

  _setInputValues(data) {
    this._popupInputs.forEach((input) => {
      input.value = data[input.name];
    });
  }
  setEventListeners() {
    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
    super.setEventListeners();
  }
}
