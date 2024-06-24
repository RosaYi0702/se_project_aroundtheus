import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super({ popupSelector });
    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._popupInputs = Array.from(
      this._popupForm.querySelectorAll(".modal__input")
    );
    this._handleFormSubmit = handleFormSubmit;
  }
  open() {
    super.open();
  }
  close() {
    this._popupForm.reset();
    super.close();
  }

  _getInputValues() {
    const formValues = {};
    this._popupInputs.forEach((input) => {
      formValues[input.name] = input.value;
    });
    return formValues;
  }
  setEventlisteners() {
    this._popupForm
      .querySelector(".modal__button")
      .setEventListeners("submit", (evt) => {
        evt.preventDefault;
        this._handleFormSubmit(this._getInputValues());
      });

    super.setEventListeners();
  }
}
