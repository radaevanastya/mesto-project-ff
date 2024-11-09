const container = document.querySelector(".content");
const placesList = container.querySelector(".places__list");
const modalEdit = document.querySelector(".popup_type_edit");
const profileEditButton = document.querySelector(".profile__edit-button");
const formElementEdit = document.querySelector('form[name="edit-profile"]');
const nameInput = formElementEdit.querySelector(".popup__input_type_name");
const jobInput = formElementEdit.querySelector(".popup__input_type_description");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const modalNewCard = document.querySelector(".popup_type_new-card");
const profileAddButton = container.querySelector(".profile__add-button");
const addCardForm = document.querySelector('form[name="new-place"]');
const closeModalButtons = document.querySelectorAll(".popup__close");
const cardNameInput = document.querySelector(".popup__input_type_card-name");
const cardLinkInput = document.querySelector(".popup__input_type_url");
const popupImage = document.querySelector(".popup_type_image");
const popupImageElement = document.querySelector(".popup__image");
const popupCaption = document.querySelector(".popup__caption");
const avatarForm = document.querySelector('form[name="new-avatar"]');
const profileOpenAvatar = document.querySelector(".profile__avatar");
const profileEditAvatar = document.querySelector(".profile__image");
const modalNewAvatar = document.querySelector(".popup_type_new-avatar");
const avatarUrlInput = document.querySelector(".popup__input_type_url-avatar");
const btnSubmitAvatar = document.querySelector(".button-submit-avatar");
const btnSubmitEditProfile = document.querySelector(".button-submit-edit-profile");
const btnSubmitAddNewCard = document.querySelector(".button-submit-add-new-card");

export {
    container, 
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
};