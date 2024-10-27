const cardTemplate = document.querySelector('#card-template').content;

export const createCard = (el, deleteCard, openImage) => {
  const elementCard = cardTemplate.cloneNode(true);

  const card = elementCard.querySelector('.card');
  const cardText = card.querySelector('.card__title');
  const cardImage = card.querySelector('.card__image');
  const cardBtn = card.querySelector('.card__delete-button');
  const cardLike = card.querySelector('.card__like-button');

  cardText.textContent = el.name;
  cardImage.alt = el.name;
  cardImage.src = el.link;

  cardBtn.addEventListener('click', deleteCard);
  cardLike.addEventListener('click', () => handleLike(card));
  cardImage.addEventListener('click', () => openImage(el));

  return elementCard;
}

export const deleteCard = (evt) => {
  evt.target.closest('.card').remove();
}

export const handleLike = (card) => {
  const likeBtn = card.querySelector('.card__like-button');
  likeBtn.classList.toggle('card__like-button_is-active');
}