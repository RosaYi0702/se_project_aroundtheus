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
    this._likeButton = this._cardElement.querySelector(".card__like");
    this._likeButton.addEventListener("click", () => {
      this._handleLikeButton();
    });
    //trash
    this._cardElement
      .querySelector(".card__trash")
      .addEventListener("click", () => {
        this._handleTrashButton();
      });

    //exhibit
    this._imageElement.addEventListener("click", () => {
      this._handleImageClick(this._name, this._link);
    });
  }

  /* --------------------------------- Handler -------------------------------- */
  _handleLikeButton() {
    this._likeButton.classList.toggle("card__like_active");
  }
  _handleTrashButton() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  /* ------------------------------ generateCard ------------------------------ */
  generateCard() {
    this._cardElement = this._getTemplate();
    this._imageElement = this._cardElement.querySelector(".card__image");
    this._imageElement.src = this._link;
    this._imageElement.alt = this._name;
    this._cardElement.querySelector(".card__name").textContent = this._name;
    this._setEventListeners();

    return this._cardElement;
  }
}
