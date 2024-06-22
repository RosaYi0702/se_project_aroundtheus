export default class Popup {
  constructor({ popupSelector }) {
    this._popupElement = document.querySelector(popupSelector);
  }

  open() {
    this._popupElement.classList.add("modal_opened");
  }
  close() {
    this._popupElement.classList.remove("modal_opened");
  }
  _handleEcsClose(evt) {
    function closeByEsc(evt) {
      if (evt.key === "Escape") {
        const openedModal = document.querySelector(".modal_opened");
        close(openedModal);
      }
    }
    document.addEventListener("keydown", closeByEsc);
  }
  setEventListeners() {
    function closePopupOverlay(evt) {
      if (evt.target === evt.currentTarget) {
        close(evt.currentTarget);
      }
    }
    this._closeButton = this._popupElement.querySelector("#modal-close-button");

    this._popupElement.addEventListener("click", closePopupOverlay);
    this._closeButton.addEventListener("click", () =>
      close(this._popupElement)
    );
  }
}
