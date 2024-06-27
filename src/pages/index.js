/* -------------------------------------------------------------------------- */
/*                                   Import                                   */
/* -------------------------------------------------------------------------- */
import "./index.css";
import { initialCards, config } from "../utils/constants.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";

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

/* -------------------------------------------------------------------------- */
/*                                     OOP                                    */
/* -------------------------------------------------------------------------- */
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

//const editFormValidator = new FormValidator(config, profileEditForm);
//editFormValidator.enableValidation();
//const cardAddFormValidator = new FormValidator(config, cardAddForm);
//cardAddFormValidator.enableValidation();
/* -------------------------------- UserInfo -------------------------------- */
const profileInfo = new UserInfo(".profile__name", ".profile__description");
/* ------------------------------ PopupWithForm ----------------------------- */
const profileEditPopup = new PopupWithForm({
  popupSelector: "#profile-edit-modal",
  handleFormSubmit: handleProfileEditSubmit,
});
profileEditPopup.setEventListeners();
const cardAddPopup = new PopupWithForm({
  popupSelector: "#card-add-modal",
  handleFormSubmit: handleCardAddSubmit,
});
cardAddPopup.setEventListeners();
/* ----------------------------- PopupWithImage (Card)----------------------------- */
const cardImagePopup = new PopupWithImage("#image-modal");
cardImagePopup.setEventListeners();
/* --------------------------------- Section -------------------------------- */
const cardList = new Section(
  {
    items: initialCards,
    renderer: renderCard,
  },
  ".cards__list"
);
cardList.renderItems();

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
  const card = new Card(cardData, "#card-template", handleImageClick);
  const cardElement = card.generateCard();
  return cardElement;
}

function renderCard(cardData) {
  const cardElement = createCard(cardData);
  cardList.addItem(cardElement);
}
/* -------------------------------------------------------------------------- */
/*                               Event Handlers                               */
/* -------------------------------------------------------------------------- */
/* ------------------------------ Profile Edit ------------------------------ */
function handleProfileEditSubmit(userData) {
  profileInfo.setUserInfo(userData);
  profileEditPopup.close();
}
function handleCardAddSubmit(formValues) {
  const name = formValues.title;
  const link = formValues.link;
  renderCard({ name, link });
  cardAddPopup.close();
  cardAddForm.reset();
  formValidators[cardAddForm.getAttribute("id")].disableButton();
}
/* -------------------------------------------------------------------------- */
/*                               Event Listeners                              */
/* -------------------------------------------------------------------------- */
/* ------------------------------ Profile Edit ------------------------------ */
profileEditButton.addEventListener("click", () => {
  fillProfileForm();
  //editFormValidator.resetValidation();
  formValidators[profileEditForm.getAttribute("id")].resetValidation();
  profileEditPopup.open();
});
/* ---------------------------------- Card ---------------------------------- */
cardAddButton.addEventListener("click", () => {
  //cardAddFormValidator.resetValidation();
  cardAddPopup.open();
});
