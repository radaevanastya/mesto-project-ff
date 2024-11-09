const showError = (formElement, inputElement, errorMessage, elements) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(elements.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(elements.errorClass);
};

const hideError = (formElement, inputElement, elements) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(elements.inputErrorClass);
  errorElement.textContent = "";
  errorElement.classList.remove(elements.errorClass);
};

const setEventListeners = (formElement, elements) => {
  const inputList = Array.from(formElement.querySelectorAll(elements.inputSelector));
  const buttonElement = formElement.querySelector(elements.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, elements);
  inputList.forEach((inputElement) =>
    inputElement.addEventListener("input", () => {
      checkInputValidity(formElement, inputElement, elements);
      toggleButtonState(inputList, buttonElement, elements);
    })
  );
};

const checkInputValidity = (formElement, inputElement, elements) => {
  inputElement.validity.patternMismatch
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    inputElement.setCustomValidity(""); 
    inputElement.validity.valid
    hideError(formElement, inputElement, elements);
    showError(formElement, inputElement, inputElement.validationMessage, elements);
};

const hasInvalidInput = (inputList) => inputList.some(inputElement => !inputElement.validity.valid);

const toggleButtonState = (inputList, buttonElement, elements) => {
  const isInvalid = hasInvalidInput(inputList);
  buttonElement.disabled = isInvalid;
  buttonElement.classList.toggle(elements.inactiveButtonClass, isInvalid);
};

export const enableValidation = (elements) => {
  const formList = Array.from(document.querySelectorAll(elements.formSelector));
  formList.forEach(formElement => {
    formElement.addEventListener("submit", (evt) => evt.preventDefault());
    setEventListeners(formElement, elements);
  });
};

export const clearValidation = (formElement, elements) => {
  const inputList = Array.from(formElement.querySelectorAll(elements.inputSelector));
  const buttonElement = formElement.querySelector(elements.submitButtonSelector);
  inputList.forEach(inputElement => hideError(formElement, inputElement, elements));
  toggleButtonState(inputList, buttonElement, elements);
};
