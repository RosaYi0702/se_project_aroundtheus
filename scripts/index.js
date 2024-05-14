const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];
/* -------------------------------------------------------------------------- */
/*                                  Elements                                  */
/* -------------------------------------------------------------------------- */

/* ------------------------------ Profile Edit ------------------------------ */
const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileModalClose = profileEditModal.querySelector("#modal-close-button");
const profileTitleInput = profileEditModal.querySelector(
  "#profile-title-input"
);
const profileDescriptionInput = profileEditModal.querySelector(
  "#profile-description-input"
);
const profileTitle = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
const profileEditForm = profileEditModal.querySelector("#profile-form");

/* ---------------------------------- Card ---------------------------------- */
//add Card
const cardAddButton = document.querySelector("#card-add-button");
const cardAddModal = document.querySelector("#card-add-modal");
const cardAddClose = cardAddModal.querySelector("#modal-close-button");
//Card List
const cardNameInput = cardAddModal.querySelector("#card-title-input");
const cardUrlInput = cardAddModal.querySelector("#image-link-input");
const cardAddForm = cardAddModal.querySelector("#add-card-form");
const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".card");

const cardListEl = document.querySelector(".cards__list");

/* -------------------------------------------------------------------------- */
/*                                  Functions                                 */
/* -------------------------------------------------------------------------- */
function closePopup(modal) {
  modal.classList.remove("modal_opened");
}

function openPopup(modal) {
  modal.classList.add("modal_opened");
}

/* ---------------------------------- Card ---------------------------------- */
function getCardElement(data) {
  //clone the template element with all its content and store it in a cardElement variable
  const cardElement = cardTemplate.cloneNode(true);
  //access the card title and image and store them in variables
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardNameEl = cardElement.querySelector(".card__name");
  //set the path to the image to the link field of the object
  cardImageEl.src = data.link;
  //set the image alt text to the name field of the object
  cardImageEl.alt = data.name;
  //set the card title to the name field of the object, too
  cardNameEl.textContent = data.name;
  //return the ready HTML element with the filled-in data
  return cardElement;
}

function renderCard(data, listLocation) {
  const cardElement = getCardElement(data);
  listLocation.prepend(cardElement);
}

/* -------------------------------------------------------------------------- */
/*                               Event Handlers                               */
/* -------------------------------------------------------------------------- */

/* ------------------------------ Profile Edit ------------------------------ */
function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closePopup(profileEditModal);
}

function handleCardAddSubmit(e) {
  e.preventDefault();
  const name = cardNameInput.value;
  const link = cardUrlInput.value;
  renderCard({ name, link }, cardListEl);
  closePopup(cardAddModal);
}

/* -------------------------------------------------------------------------- */
/*                               Event Listeners                              */
/* -------------------------------------------------------------------------- */

/* ------------------------------ Profile Edit ------------------------------ */
profileEditButton.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  openPopup(profileEditModal);
});

profileModalClose.addEventListener("click", () => closePopup(profileEditModal));

profileEditForm.addEventListener("submit", handleProfileEditSubmit);

/* ---------------------------------- Card ---------------------------------- */
//add card button
cardAddButton.addEventListener("click", () => {
  openPopup(cardAddModal);
});

cardAddClose.addEventListener("click", () => closePopup(cardAddModal));

cardAddForm.addEventListener("submit", handleCardAddSubmit);

//Card List
initialCards.forEach((data) => renderCard(data, cardListEl));
