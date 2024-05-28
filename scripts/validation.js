const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

/* -------------------------------------------------------------------------- */
/*                                  function                                  */
/* -------------------------------------------------------------------------- */

//8.check are all inputs valid
function hasInvalidInput(inputList) {
  return !inputList.every((inputEl) => inputEl.validity.valid);
}

//9.disable Button
function disableButton(submitButton, { inactiveButtonClass }) {
  submitButton.classList.add(inactiveButtonClass);
  submitButton.disable = true;
}

//9.enable button
function enableButton(submitButton, { inactiveButtonClass }) {
  submitButton.classList.remove(inactiveButtonClass);
  submitButton.disable = false;
}

//7.Button show invalid or not
function toggleButtonState(inputEls, submitButton, { inactiveButtonClass }) {
  if (hasInvalidInput(inputEls)) {
    disableButton(submitButton, { inactiveButtonClass });
  } else {
    enableButton(submitButton, { inactiveButtonClass });
  }
}

//6. invalid
function showInputError(formEl, inputEl, { inputErrorClass, errorClass }) {
  const errorMessageEl = formEl.querySelector(`#${inputEl.id}-error`);
  inputEl.classList.add(inputErrorClass);
  errorMessageEl.textContent = inputEl.validationMessage;
  errorMessageEl.classList.add(errorClass);
}

//6. valid
function hideInputError(formEl, inputEl, { inputErrorClass, errorClass }) {
  const errorMessageEl = formEl.querySelector(`#${inputEl.id}-error`);
  inputEl.classList.remove(inputErrorClass);
  errorMessageEl.textContent = inputEl.validationMessage;
  errorMessageEl.classList.remove(errorClass);
}
//5.if invalid then show
function checkInputValidity(formEl, inputEl, options) {
  if (!inputEl.validity.valid) {
    return showInputError(formEl, inputEl, options);
  }
  hideInputError(formEl, inputEl, options);
}

function setEventListener(formEl, options) {
  const { inputSelector, submitButtonSelector } = options;
  //3.Selects all inputs inside the form and makes an array from them.
  const inputEls = [...formEl.querySelectorAll(inputSelector)];

  inputEls.forEach((inputEl) => {
    //4.check every single typing. use"change" for checking after finish input.
    inputEl.addEventListener("input", () => {
      //5. tell us each change is valid or not.
      checkInputValidity(formEl, inputEl, options);
      //7.Toggle Button
      const submitButton = formEl.querySelector(submitButtonSelector);
      toggleButtonState(inputEls, submitButton, options);
    });
  });
}

//1.collect all forms on the page and adds submit handlers to them.
function enableValidation(options) {
  //2.Selects all the forms and makes an array from them.
  const { formSelector } = options;
  const formEls = [...document.querySelectorAll(formSelector)];
  formEls.forEach((formEl) => {
    formEl.addEventListener("submit", (e) => {
      e.preventDefault();
    });
    //3.input array
    setEventListener(formEl, options);
  });
}

enableValidation(config);
