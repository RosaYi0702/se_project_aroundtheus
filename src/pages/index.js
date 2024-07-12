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
/*                                   General                                  */
/* -------------------------------------------------------------------------- */
/* ----------------------------------- Api ---------------------------------- */
const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "556b7174-cdb9-4bbc-853b-d91bc60928df",
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

/* -------------------------------------------------------------------------- */
/*                                   Profile                                  */
/* -------------------------------------------------------------------------- */
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

function fillProfileForm() {
  const userData = profileInfo.getUserInfo();
  profileTitleInput.value = userData.name;
  profileDescriptionInput.value = userData.job;
}

function handleProfileEditSubmit(userData) {
  profileEditPopup.renderLoading(true);
  api
    .editUserInfo(userData)
    .then((res) => {
      profileInfo.setUserInfo({ name: res.name, description: res.about });
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      profileEditPopup.renderLoading(false);
    });
  profileEditPopup.close();
}

profileEditButton.addEventListener("click", () => {
  fillProfileForm();
  formValidators[profileEditForm.getAttribute("id")].resetValidation();
  profileEditPopup.open();
});

/* ------------------------------- avatarPopup ------------------------------ */
api
  .getUserInfo()
  .then((res) => {
    console.log("get res", res);
    profileInfo.setUserAvatar({ avatar: res.avatar });
  })
  .catch((err) => {
    console.error(err);
  });

const avatarEditPopup = new PopupWithForm({
  popupSelector: "#profile-avatar-modal",
  handleFormSubmit: handleAvatarEditSubmit,
});

avatarEditPopup.setEventListeners();

function handleAvatarEditSubmit(userData) {
  avatarEditPopup.renderLoading(true);
  api
    .editUserAvatar(userData)
    .then((res) => {
      profileInfo.setUserAvatar({ avatar: res.avatar });
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      avatarEditPopup.renderLoading(false);
    });
  avatarEditPopup.close();
}

avatarEditButton.addEventListener("click", () => {
  avatarEditPopup.open();
});

/* -------------------------------------------------------------------------- */
/*                                    Card                                    */
/* -------------------------------------------------------------------------- */
/* ---------------------------------- Card ---------------------------------- */
function createCard(cardData) {
  const card = new Card(
    cardData,
    "#card-template",
    handleImageClick,
    handleDeleteClick,
    handleLikeClick
  );
  const cardElement = card.generateCard();
  return cardElement;
}
/* -------------------------------- CardList -------------------------------- */
const cardList = new Section(
  {
    renderer: (items) => {
      cardList.addItem(items);
    },
  },
  ".cards__list"
);

function cardListData() {
  return api
    .getInitialCards()
    .then((data) => {
      console.log("data", data);
      const cardElement = data.map((cardData) => createCard(cardData));
      cardList.renderItems(cardElement);
    })
    .catch((err) => {
      console.error(err);
    });
}

cardListData();
/* ------------------------------ cardAddPopup ------------------------------ */

const cardAddPopup = new PopupWithForm({
  popupSelector: "#card-add-modal",
  handleFormSubmit: handleCardAddSubmit,
});
cardAddPopup.setEventListeners();

cardAddButton.addEventListener("click", () => {
  cardAddPopup.open();
});

function handleCardAddSubmit(formValues) {
  const name = formValues.title;
  const link = formValues.link;
  cardAddPopup.renderLoading(true);
  api
    .addNewCard({ name, link })

    .then((card) => {
      const cardElement = createCard(card);
      cardList.addItem(cardElement);
    })
    .then(() => {
      cardAddPopup.close();
      cardAddForm.reset();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      cardAddPopup.renderLoading(false);
    });

  formValidators[cardAddForm.getAttribute("id")].disableButton();
}
/* ----------------------------- cardImagePopup----------------------------- */
const cardImagePopup = new PopupWithImage("#image-modal");
cardImagePopup.setEventListeners();

function handleImageClick(name, link) {
  cardImagePopup.open(name, link);
}

/* --------------------------- DeleteConfirmPopup --------------------------- */
const deleteConfirmPopup = new PopupWithConfirmation({
  popupSelector: "#confirmation-modal",
  handleFormSubmit: handleDeleteClick,
});
deleteConfirmPopup.setEventListeners();

function handleDeleteClick(card) {
  deleteConfirmPopup.open();
  deleteConfirmPopup.confirmDelete(() => {
    api
      .deleteCard(card.getId())
      .then(() => {
        card.removeCard();
        deleteConfirmPopup.close();
      })
      .catch((err) => {
        console.error("Card deletion API failed:", err);
      });
  });
}

/* -------------------------------- LikeCard -------------------------------- */
function handleLikeClick(card) {
  api
    .setCardLike(card.getId(), card.getLikeMethod())
    .then((res) => {
      card.updateLiked(res.isLiked);
    })
    .catch((err) => {
      console.error("Like Button Error", err);
    });
}
