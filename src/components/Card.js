export default class Card {
  constructor(
    data,
    cardSelector,
    handleImageClick,
    handleDeleteClick,
    handleLikeClick
  ) {
    this._data = data;
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeClick = handleLikeClick;
    this.cardId = data._id;
    this._islike = data.islike;
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
      // this._handleLikeButton();
      this._handleLikeClick(this);
    });
    //trash
    this._cardElement
      .querySelector(".card__trash")
      .addEventListener("click", () => {
        this._handleDeleteClick(this);
        //this._handleTrashButton();
      });

    //exhibit
    this._imageElement.addEventListener("click", () => {
      this._handleImageClick(this._name, this._link);
    });
  }

  /* --------------------------------- Handler -------------------------------- */

  /*_handleLikeButton() {
    this._likeButton.classList.toggle("card__like_active");
  }

  /*
  _handleTrashButton() {
    this._cardElement.remove();
    this._cardElement = null;
  }
*/
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

  removeCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  getId() {
    return this.cardId;
  }
}
