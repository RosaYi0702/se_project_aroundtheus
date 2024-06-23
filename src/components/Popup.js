export default class Popup {
  constructor({ popupSelector }) {
    this._popupElement = document.querySelector(popupSelector);
    this._openedModal = document.querySelector(".modal_opened");
  }

  open() {
    this._popupElement.classList.add("modal_opened");
    document.addEventListener("keydown", thi._handleEcsClose);
  }
  close() {
    this._popupElement.classList.remove("modal_opened");
    document.removeEventListener("keydown", thi._handleEcsClose);
  }
  _handleEcsClose(evt) {
    function closeByEsc(evt) {
      if (evt.key === "Escape") {
        this.close(this._openedModal);
      }
    }
  }
  setEventListeners() {
    this._popupElement.addEventListener("mousedown", (evt) => {
      if (
        evt.target.classList.contains("modal") ||
        evt.target.classList.contains("modal__close")
      ) {
        this.close(this._openedModal);
      }
    });
  }
}
