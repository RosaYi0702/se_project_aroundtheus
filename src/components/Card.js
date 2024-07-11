export default class Card {
  constructor(
    data,
    cardSelector,
    handleImageClick,
    handleDeleteClick,
    handleLikeClick
  ) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeClick = handleLikeClick;

    this.cardId = data._id;
    this._isliked = data.isLiked;
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
    this._currentStatus =
      this._likeButton.classList.contains("card__like_active");
    this.method = this._currentStatus ? "DELETE" : "PUT";
    this._likeButton.addEventListener("click", () => {
      // this._handleLikeButton();
      this._handleLikeClick(this);
    });
    //trash
    this._cardElement
      .querySelector(".card__trash")
      .addEventListener("click", () => {
        this._handleDeleteClick(this);
      });

    //exhibit
    this._imageElement.addEventListener("click", () => {
      this._handleImageClick(this._name, this._link);
    });
  }

  updateLikeButton() {
    const likeButton = this._cardElement.querySelector(".card__like");
    if (this._isliked) {
      likeButton.classList.add("card__like_active");
    } else {
      likeButton.classList.remove("card__like_active");
    }
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

  removeCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  getId() {
    return this.cardId;
  }
  /* -------------------------------- LikeCard -------------------------------- */
}
