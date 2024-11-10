import "./pages/index.css";
import { createCard, deleteCard, likeCard } from "./components/card";
import { openPopup, closePopup } from "./components/modal";
import { clearValidation, enableValidation } from "./components/validation";
import { getUserRequest, loadCards, editProfileApi, addNewCardApi, newAvatarApi } from "./components/api";

import {
  placesList, 
  modalEdit, 
  profileEditButton, 
  formElementEdit, 
  nameInput, 
  jobInput, 
  profileTitle, 
  profileDescription, 
  modalNewCard,
  profileAddButton, 
  addCardForm, 
  closeModalButtons, 
  cardNameInput, 
  cardLinkInput,
  popupImage,
  popupImageElement,
  popupCaption,
  avatarForm,
  profileOpenAvatar,
  profileEditAvatar,
  modalNewAvatar,
  avatarUrlInput,
  btnSubmitAvatar,
  btnSubmitEditProfile,
  btnSubmitAddNewCard
} from "./elements/main";

import { validationElements } from "./elements/validation";

enableValidation(validationElements);

let userId, cardId;

profileOpenAvatar.addEventListener("click", function () {
  openPopup(modalNewAvatar);
  clearValidation(modalNewAvatar, validationElements); 
});

function openImage(link, alt) {
  popupImageElement.src = link;
  popupImageElement.alt = alt;
  popupCaption.textContent = alt;
  openPopup(popupImage);
}

profileAddButton.addEventListener("click", function () {
  openPopup(modalNewCard);
  clearValidation(modalNewCard, validationElements);
});

profileEditButton.addEventListener("click", function () {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;

  openPopup(modalEdit);
  clearValidation(modalEdit, validationElements);
});


closeModalButtons.forEach((button) => {
  const popup = button.closest(".popup");
  button.addEventListener("click", () => {
    closePopup(popup);
  });
});

function editAvatar(e) {
  e.preventDefault();
  renderLoading(true, btnSubmitAvatar);

  newAvatarApi(avatarUrlInput.value)
    .then((res) => {
      profileEditAvatar.src = res.avatar;
      avatarForm.reset();
      closePopup(modalNewAvatar);
    })
    .catch((err) => console.log(err))
    .finally(() => {
      renderLoading(false, btnSubmitAvatar);
    });
};

function handleEditProfile(e) {
  e.preventDefault();

  renderLoading(true, btnSubmitEditProfile);

  editProfileApi(nameInput.value, jobInput.value)
    .then((res) => {
      profileTitle.textContent = res.name;
      profileDescription.textContent = res.about;

      closePopup(modalEdit);
    })
    .catch((err) => console.log(err))
    .finally(() => {
      renderLoading(false, btnSubmitEditProfile);
    });
};

function addNewCardSubmit(e) {
  e.preventDefault();
  renderLoading(true, btnSubmitAddNewCard);

  addNewCardApi(cardNameInput.value, cardLinkInput.value)
    .then((item) => {
      cardId = item._id;
      const newCard = createCard(
        item,
        deleteCard,
        likeCard,
        openImage,
        userId,
        cardId,
      );
      addCard(newCard, true);
      addCardForm.reset();
      closePopup(modalNewCard);
    })
    .catch((err) => console.log(err))
    .finally(() => {
      addCardForm.reset();
      renderLoading(false, btnSubmitAddNewCard);
    });
};

function addCard(item, toStart) {
  if (toStart === true) {
    placesList.prepend(item);
  } else {
    placesList.append(item);
  }
};

function renderLoading(isLoading, submitButton) {
  if (isLoading) {
    submitButton.textContent = "Сохранение...";
  } else {
    submitButton.textContent = "Сохранить";
  }
};

formElementEdit.addEventListener("submit", handleEditProfile);
avatarForm.addEventListener("submit", editAvatar);
addCardForm.addEventListener("submit", addNewCardSubmit);

Promise.all([getUserRequest(), loadCards()])
  .then(([dataRes, cardRes]) => {
    userId = dataRes._id;
    profileTitle.textContent = dataRes.name;
    profileDescription.textContent = dataRes.about;
    profileEditAvatar.src = dataRes.avatar;

    cardRes.forEach(function (item) {
      cardId = item._id;
      const card = createCard(item, deleteCard, likeCard, openImage, userId, cardId);
      addCard(card);
    });
  })
  .catch((err) => {
    console.log(err);
  });