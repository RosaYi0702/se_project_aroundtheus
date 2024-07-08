/* -------------------------------------------------------------------------- */
/*                                   Import                                   */
/* -------------------------------------------------------------------------- */
import "./index.css";
import { initialCards, config } from "../utils/constants.js";
import Api from "../utils/api.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithConfirmation from "../components/PopupwithConfirmation.js";

/* -------------------------------------------------------------------------- */
/*                                 used const                                 */
/* -------------------------------------------------------------------------- */
const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditForm = document.querySelector("#profile-form");
const cardAddButton = document.querySelector("#card-add-button");
const cardAddForm = document.querySelector("#add-card-form");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
const avatarEditButton = document.querySelector("#avatar-edit-button");
/* -------------------------------------------------------------------------- */
/*                                     OOP                                    */
/* -------------------------------------------------------------------------- */

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "f0236218-80b1-4e28-bbd2-7b2cb80c1217",
    "Content-Type": "application/json",
  },
});

/* --------------------------- FormValidator(Form) -------------------------- */
const formValidators = {};

const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement);
    const formName = formElement.getAttribute("id");
    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

enableValidation(config);

/* -------------------------------- UserInfo -------------------------------- */
const profileInfo = new UserInfo(
  ".profile__name",
  ".profile__description",
  ".profile__avatar"
);

api
  .getUserInfo()
  .then((res) => {
    profileInfo.setUserInfo({ name: res.name, description: res.about });
  })
  .catch((err) => {
    console.error(err);
  });

/* ------------------------------ ProfilePopup ----------------------------- */
const profileEditPopup = new PopupWithForm({
  popupSelector: "#profile-edit-modal",
  handleFormSubmit: handleProfileEditSubmit,
});
profileEditPopup.setEventListeners();

/* ------------------------------ cardAddPopup ------------------------------ */
const cardAddPopup = new PopupWithForm({
  popupSelector: "#card-add-modal",
  handleFormSubmit: handleCardAddSubmit,
});
cardAddPopup.setEventListeners();
/* ------------------------------- avatarPopup ------------------------------ */
const avatarEditPopup = new PopupWithForm({
  popupSelector: "#profile-avatar-modal",
  handleFormSubmit: handleAvatarEditSubmit,
});
avatarEditPopup.setEventListeners();
/* ----------------------------- PopupWithImage (Card)----------------------------- */
const cardImagePopup = new PopupWithImage("#image-modal");
cardImagePopup.setEventListeners();

/* --------------------------- DeleteConfirmPopup --------------------------- */
const deleteConfirmPopup = new PopupWithConfirmation({
  popupSelector: "#confirmation-modal",
  handleFormSubmit: handleDeleteClick,
});
deleteConfirmPopup.setEventListeners();
/* --------------------------------- Section -------------------------------- */
function cardListData() {
  return api
    .getInitialCards()
    .then((res) => {
      console.log("Fetched Cards:", res);
      return res.map((card) => ({ name: card.name, link: card.link }));
    })
    .catch((err) => {
      console.error(err);
      return [];
    });
}

const cardList = new Section(
  {
    renderer: (items) => {
      cardList.addItem(items);
    },
  },
  ".cards__list"
);

cardListData()
  .then((data) => {
    const cardElement = data.map((cardData) => createCard(cardData));
    cardList.renderItems(cardElement);
  })
  .catch((err) => {
    console.error(err);
  });

/* -------------------------------------------------------------------------- */
/*                                  Functions                                 */
/* -------------------------------------------------------------------------- */
/* --------------------------------- Profile -------------------------------- */
function fillProfileForm() {
  const userData = profileInfo.getUserInfo();
  profileTitleInput.value = userData.name;
  profileDescriptionInput.value = userData.job;
}
/* ---------------------------------- Card ---------------------------------- */

function handleImageClick(name, link) {
  cardImagePopup.open(name, link);
}

function createCard(cardData) {
  const card = new Card(
    cardData,
    "#card-template",
    handleImageClick,
    handleDeleteClick
  );
  const cardElement = card.generateCard();
  return cardElement;
}
/*
function renderCard(cardData) {
  const cardElement = createCard(cardData);
  cardList.addItem(cardElement);
}
*/
/* -------------------------------------------------------------------------- */
/*                               Event Handlers                               */
/* -------------------------------------------------------------------------- */
/* ------------------------------ Profile Edit ------------------------------ */
function handleProfileEditSubmit(userData) {
  api
    .editUserInfo(userData)
    .then((res) => {
      profileInfo.setUserInfo({ name: res.name, description: res.about });
    })
    .catch((err) => {
      console.error(err);
    });
  profileEditPopup.close();
}

function handleCardAddSubmit(formValues) {
  const name = formValues.title;
  const link = formValues.link;
  cardList.addItem(createCard({ name, link }));
  cardAddPopup.close();
  cardAddForm.reset();
  formValidators[cardAddForm.getAttribute("id")].disableButton();
}

function handleAvatarEditSubmit(userData) {
  api
    .editUserAvatar(userData)
    .then((res) => {
      profileInfo.setUserAvatar({ avatar: res.avatar });
    })
    .catch((err) => {
      console.error(err);
    });
  avatarEditPopup.close();
}

function handleDeleteClick(card) {
  console.log("Delete button clicked");
  deleteConfirmPopup.open();
  deleteConfirmPopup.confirmDelete(() => {
    console.log("Deletion confirmed");
    api
      .deleteCard(card.getId())
      .then(() => {
        console.log("Card deletion API succeeded");
        card.removeCard();
        deleteConfirmPopup.close();
      })
      .catch((err) => {
        console.error("Card deletion API failed:", err);
      });
  });
}
/* -------------------------------------------------------------------------- */
/*                               Event Listeners                              */
/* -------------------------------------------------------------------------- */
/* ------------------------------ Profile Edit ------------------------------ */
profileEditButton.addEventListener("click", () => {
  fillProfileForm();
  formValidators[profileEditForm.getAttribute("id")].resetValidation();
  profileEditPopup.open();
});
/* ---------------------------------- Card ---------------------------------- */
cardAddButton.addEventListener("click", () => {
  cardAddPopup.open();
});
/* ------------------------------- Avatar Edit ------------------------------ */
avatarEditButton.addEventListener("click", () => {
  avatarEditPopup.open();
});
/* ------------------------------- DeleteCard ------------------------------- */
