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

/* ---------------------------------- Image --------------------------------- */
const imageExhibit = document.querySelector("#image-modal");
const imageClose = imageExhibit.querySelector("#modal-close-button");

/* ---------------------------------- modal --------------------------------- */
const openModal = document.querySelector("modal_opened");

/* -------------------------------------------------------------------------- */
/*                                  Functions                                 */
/* -------------------------------------------------------------------------- */
function closePopup(modal) {
  modal.classList.remove("modal_opened");
  modal.removeEventListener("click", closePopupOverlay);
  document.removeEventListener("keydown", closeByEsc);
}

function openPopup(modal) {
  modal.classList.add("modal_opened");
  modal.addEventListener("click", closePopupOverlay);
  document.addEventListener("keydown", closeByEsc);
}

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
/* --------------------------------- Profile -------------------------------- */
function fillProfileForm() {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
}

/* ---------------------------------- Card ---------------------------------- */

function getCardElement(data) {
  //card const
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardNameEl = cardElement.querySelector(".card__name");
  const cardLikeButton = cardElement.querySelector(".card__like");
  const cardTrash = cardElement.querySelector(".card__trash");

  //exhibit const
  const exhibitImageEl = imageExhibit.querySelector(".modal__exhibit-image");
  const exhibitNameEl = imageExhibit.querySelector(
    ".modal__exhibit-image-name"
  );
  //like button
  cardLikeButton.addEventListener("click", () => {
    cardLikeButton.classList.toggle("card__like_active");
  });

  //trash
  cardTrash.addEventListener("click", () => {
    cardElement.remove();
  });

  //exhibit
  cardImageEl.addEventListener("click", () => {
    exhibitImageEl.src = data.link;
    exhibitImageEl.alt = data.name;
    exhibitNameEl.textContent = data.name;

    openPopup(imageExhibit);
  });

  cardImageEl.src = data.link;
  cardImageEl.alt = data.name;
  cardNameEl.textContent = data.name;

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
  cardAddForm.reset();
  closePopup(cardAddModal);
}

/* -------------------------------------------------------------------------- */
/*                               Event Listeners                              */
/* -------------------------------------------------------------------------- */

/* ------------------------------ Profile Edit ------------------------------ */
profileEditButton.addEventListener("click", () => {
  fillProfileForm();
  openPopup(profileEditModal);
});

profileModalClose.addEventListener("click", () => closePopup(profileEditModal));

profileEditForm.addEventListener("submit", handleProfileEditSubmit);

profileEditModal.addEventListener("click", closePopupOverlay);
/* ---------------------------------- Card ---------------------------------- */
//add card button
cardAddButton.addEventListener("click", () => {
  openPopup(cardAddModal);
});

cardAddClose.addEventListener("click", () => closePopup(cardAddModal));

cardAddForm.addEventListener("submit", handleCardAddSubmit);

//Card List
initialCards.forEach((data) => renderCard(data, cardListEl));

/* ---------------------------------- Image --------------------------------- */
imageClose.addEventListener("click", () => closePopup(imageExhibit));
