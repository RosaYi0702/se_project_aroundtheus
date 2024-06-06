export default class Card {
  constructor({ name, link }, cardSelector, handleImageClick) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
  }
  /* ------------------------------ _getTemplate ------------------------------ */
  _getTemplate() {
    this._cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
    return this._cardElement;
  }

  /* --------------------------- _setEventListeners --------------------------- */
  _setEventListeners() {
    //like button
    this._cardElement
      .querySelector(".card__like")
      .addEventListener("click", () => {
        this._cardLikeButtonHandler();
      });
    //trash
    this._cardElement
      .querySelector(".card__trash")
      .addEventListener("click", () => {
        this._trashButtonHandler();
      });

    //exhibit
    this._cardElement
      .querySelector(".card__image")
      .addEventListener("click", () => {
        this._handleImageClick(this._name, this._link);
      });
  }

  /* --------------------------------- Handler -------------------------------- */
  _cardLikeButtonHandler() {
    this._cardElement
      .querySelector(".card__like")
      .classList.toggle("card__like_active");
  }
  _trashButtonHandler() {
    this._cardElement.remove();
  }

  /* ------------------------------ generateCard ------------------------------ */
  generateCard() {
    this._cardElement = this._getTemplate();
    this._cardElement.querySelector(".card__image").src = this._link;
    this._cardElement.querySelector(".card__image").alt = this._name;
    this._cardElement.querySelector(".card__name").textContent = this._name;

    this._setEventListeners();
    return this._cardElement;
  }
}
