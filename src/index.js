import './pages/index.css';
import { initialCards } from './components/cards.js'
import { createCard, deleteCard } from './components/card.js'
import { closePopup, openPopup } from './components/modal.js';

const container = document.querySelector('.content');
const cardList = container.querySelector('.places__list');

// Попапы (Модальные окна)
const allPopup = document.querySelectorAll('.popup');
const profileAddPopup = document.querySelector('.popup_type_new-card');
const profileImagePopup = document.querySelector('.popup__avatar');
const profilePopup = document.querySelector('.popup_type_edit');
const openPopupImage = document.querySelector('.popup_type_image');

// Кнопки на сайте (Для открытия модальных окон)
const profileAddButton = document.querySelector('.profile__add-button');
const profileImageButton = document.querySelector('.profile__image');
const profileEditButton = document.querySelector('.profile__edit-button');

const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__description');

const profileInputName = profilePopup.querySelector('.popup__input_type_name');
const profileInputJob = profilePopup.querySelector('.popup__input_type_description');

const profileForm = profilePopup.querySelector('.popup__form');
const addForm = profileAddPopup.querySelector('.popup__form');

const addInputName = profileAddPopup.querySelector('.popup__input_type_card-name');
const addInputUrl = profileAddPopup.querySelector('.popup__input_type_url');

const imagePopup = openPopupImage.querySelector('.popup__image');
const imagePopupDesc = openPopupImage.querySelector('.popup__caption');

allPopup.forEach((popup) => {
  popup.addEventListener('mouseup', (evt) => {
    const isCloseBtn = evt.target.classList.contains('popup__close');
    const isOverlay = evt.target === evt.currentTarget;
    if (isCloseBtn || isOverlay) closePopup(popup);
  })
})

const openImage = ({name, link}) => {
  imagePopup.alt = name;
  imagePopup.src = link;
  imagePopupDesc.textContent = name;
  openPopup(openPopupImage);
}

const handleProfileFormSubmit = (evt) => {
  evt.preventDefault();
  profileName.textContent = profileInputName.value;
  profileJob.textContent = profileInputJob.value;
  closePopup(profilePopup);
}

const handleCardFormSubmit = (evt) => {
  evt.preventDefault();
  const name = addInputName.value;
  const link = addInputUrl.value;
  cardList.prepend(createCard({name, link}, deleteCard, openImage))
  closePopup(profileAddPopup);
}

profileAddButton.addEventListener('click', () => {
  addInputName.value = '';
  addInputUrl.value = '';
  openPopup(profileAddPopup);
})

profileImageButton.addEventListener('click', () => {
  openPopup(profileImagePopup);
})

profileEditButton.addEventListener('click', () => {
  profileInputName.value = profileName.textContent;
  profileInputJob.value = profileJob.textContent;
  openPopup(profilePopup);
})


initialCards.forEach(el => cardList.append(createCard(el, deleteCard, openImage)));

profileForm.addEventListener('submit', handleProfileFormSubmit);
addForm.addEventListener('submit', handleCardFormSubmit);
