/* -------------------------------------------------------------------------- */
/*                                   Import                                   */
/* -------------------------------------------------------------------------- */
import "./index.css";
import { initialCards } from "../utils/constants.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";

/* -------------------------------------------------------------------------- */
/*                                  Elements                                  */
/* -------------------------------------------------------------------------- */

/* ------------------------------ Profile Edit ------------------------------ */
const profileEditButton = document.querySelector("#profile-edit-button");
//const profileEditModal = document.querySelector("#profile-edit-modal");
//const profileModalClose = profileEditModal.querySelector("#modal-close-button");
/*const profileTitleInput = profileEditModal.querySelector(
  "#profile-title-input"
);
const profileDescriptionInput = profileEditModal.querySelector(
  "#profile-description-input"
);
*/
//const profileTitle = document.querySelector(".profile__name");
//const profileDescription = document.querySelector(".profile__description");
//const profileEditForm = profileEditModal.querySelector("#profile-form");

/* ---------------------------------- Card ---------------------------------- */
//add Card
const cardAddButton = document.querySelector("#card-add-button");
//const cardAddModal = document.querySelector("#card-add-modal");
//const cardAddClose = cardAddModal.querySelector("#modal-close-button");
//Card List
//const cardNameInput = cardAddModal.querySelector("#card-title-input");
//const cardUrlInput = cardAddModal.querySelector("#image-link-input");
//const cardAddForm = cardAddModal.querySelector("#add-card-form");
/*const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".card");
*/
const cardListEl = document.querySelector(".cards__list");

/* ---------------------------------- Image --------------------------------- */
//const imageExhibit = document.querySelector("#image-modal");
//const imageClose = imageExhibit.querySelector("#modal-close-button");

/* ---------------------------------- modal --------------------------------- */
//const openModal = document.querySelector("modal_opened");

/* -------------------------------------------------------------------------- */
/*                                 used const                                 */
/* -------------------------------------------------------------------------- */
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileEditForm = profileEditModal.querySelector("#profile-form");
const cardAddModal = document.querySelector("#card-add-modal");
const cardAddForm = cardAddModal.querySelector("#add-card-form");
const profileTitleInput = profileEditModal.querySelector(
  "#profile-title-input"
);
const profileDescriptionInput = profileEditModal.querySelector(
  "#profile-description-input"
);

/* -------------------------------------------------------------------------- */
/*                                     OOP                                    */
/* -------------------------------------------------------------------------- */
/* --------------------------- FormValidator(Form) -------------------------- */
const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

const editFormValidator = new FormValidator(config, profileEditForm);
editFormValidator.enableValidation();
const cardAddFormValidator = new FormValidator(config, cardAddForm);
cardAddFormValidator.enableValidation();

/* -------------------------------- UserInfo -------------------------------- */
const profileInfo = new UserInfo(".profile__name", ".profile__description");

/* ------------------------------ PopupWithForm ----------------------------- */
const profileEditPopup = new PopupWithForm(
  "#profile-edit-modal",
  handleProfileEditSubmit
);
profileEditPopup.setEventListeners();

const cardAddPopup = new PopupWithForm("#card-add-modal", handleCardAddSubmit);

cardAddPopup.setEventListeners();

/* ----------------------------- PopupWithImage (Card)----------------------------- */
//initialCards.forEach((initialCard) => {
const CardImagePopup = new PopupWithImage("#image-modal");
CardImagePopup.setEventListeners();
//});

/* --------------------------------- Section -------------------------------- */

const cardList = new Section(
  {
    items: initialCards,
    renderer: (cardData) => {
      // create the card
      renderCard(cardData);
    },
  },
  ".cards__list"
);

cardList.renderItems();

/* -------------------------------------------------------------------------- */
/*                                  Functions                                 */
/* -------------------------------------------------------------------------- */
/*
function closePopup(modal) {
  modal.classList.remove("modal_opened");
  //modal.removeEventListener("click", closePopupOverlay);
  //document.removeEventListener("keydown", closeByEsc);
}
  */
/*
function openPopup(modal) {
  modal.classList.add("modal_opened");
  //modal.addEventListener("click", closePopupOverlay);
  // document.addEventListener("keydown", closeByEsc);
}
  */
/*
function closePopupOverlay(evt) {
  if (evt.target === evt.currentTarget) {
    closePopup(evt.currentTarget);
  }
}

function closeByEsc(evt) {
  if (evt.key === "Escape") {
    const openedModal = document.querySelector(".modal_opened");
    closePopup(openedModal);
  }
}
*/
/* --------------------------------- Profile -------------------------------- */
function fillProfileForm() {
  const userData = profileInfo.getUserInfo();
  profileTitleInput.value = userData.name;
  profileDescriptionInput.value = userData.job;
}

/* ---------------------------------- Card ---------------------------------- */

//function getCardElement(data) {
//card const
//const cardElement = cardTemplate.cloneNode(true);
//const cardImageEl = cardElement.querySelector(".card__image");
//const cardNameEl = cardElement.querySelector(".card__name");
//const cardLikeButton = cardElement.querySelector(".card__like");
//const cardTrash = cardElement.querySelector(".card__trash");
//exhibit const
//const exhibitImageEl = imageExhibit.querySelector(".modal__exhibit-image");
/*const exhibitNameEl = imageExhibit.querySelector(
    ".modal__exhibit-image-name"
  );*/
//like button
/*cardLikeButton.addEventListener("click", () => {
    cardLikeButton.classList.toggle("card__like_active");
  });*/
//trash
/*cardTrash.addEventListener("click", () => {
    cardElement.remove();
  });*/
//exhibit
/*cardImageEl.addEventListener("click", () => {
    exhibitImageEl.src = data.link;
    exhibitImageEl.alt = data.name;
    exhibitNameEl.textContent = data.name;

    openPopup(imageExhibit);
  });*/
//cardImageEl.src = data.link;
//cardImageEl.alt = data.name;
//cardNameEl.textContent = data.name;
//return cardElement;
//}

function handleImageClick(name, link) {
  //openPopup({ name, link });
  CardImagePopup.open(name, link);
}

function renderCard(initialCard) {
  const card = new Card(initialCard, "#card-template", handleImageClick);
  const cardElement = card.generateCard();
  //const cardElement = getCardElement(data);
  //listLocation.prepend(cardElement);
  cardList.addItem(cardElement);
}

/* -------------------------------------------------------------------------- */
/*                               Event Handlers                               */
/* -------------------------------------------------------------------------- */

/* ------------------------------ Profile Edit ------------------------------ */
function handleProfileEditSubmit(userData) {
  //e.preventDefault();

  profileInfo.setUserInfo(userData);
  profileEditPopup.close();

  //closePopup(profileEditModal);
}

function handleCardAddSubmit(formValues) {
  //e.preventDefault();
  console.log("handleCardAddSubmit called with:", formValues);
  const name = formValues.title;
  const link = formValues.link;
  renderCard({ name, link });

  //e.target.reset();
  //closePopup(cardAddModal);
  cardAddPopup.close();
  cardAddFormValidator.resetValidation();
}

/* -------------------------------------------------------------------------- */
/*                               Event Listeners                              */
/* -------------------------------------------------------------------------- */

/* ------------------------------ Profile Edit ------------------------------ */

profileEditButton.addEventListener("click", () => {
  fillProfileForm();
  profileEditPopup.open();
  //openPopup(profileEditModal);
});

//profileModalClose.addEventListener("click", () => closePopup(profileEditModal));

//profileEditForm.addEventListener("submit", handleProfileEditSubmit);

/* ---------------------------------- Card ---------------------------------- */
//add card button

cardAddButton.addEventListener("click", () => {
  cardAddPopup.open();
  //openPopup(cardAddModal);
});

//cardAddClose.addEventListener("click", () => closePopup(cardAddModal));

//cardAddForm.addEventListener("submit", handleCardAddSubmit);

//Card List
//initialCards.forEach((data) => renderCard(data, cardListEl));

/* ---------------------------------- Image --------------------------------- */
//imageClose.addEventListener("click", () => closePopup(imageExhibit));
