import { putLikeCard, deleteLikeCard, deleteDataCard } from "./api";
import { cardElements } from "../elements/cards";

export function createCard( item, deleteCard, likeCard, openImage, userId, cardId) {
  const cardTemplate = document.querySelector(cardElements.template).content;
  const cardElement = cardTemplate.querySelector(cardElements.element).cloneNode(true);
  const cardTitle = cardElement.querySelector(cardElements.title);
  const cardImage = cardElement.querySelector(cardElements.image);
  const cardDeleteButton = cardElement.querySelector(cardElements.deleteButton);
  const cardLikeButton = cardElement.querySelector(cardElements.likeButton);
  const likeCounter = cardElement.querySelector(cardElements.likeCounter);
  cardImage.src = item.link;
  cardImage.alt = item.name;
  cardTitle.textContent = item.name;
  likeCounter.textContent = item.likes.length;
  if (item.owner._id !== userId) {
    cardDeleteButton.remove();
  };
  cardDeleteButton.addEventListener("click", () => {
    deleteCard(cardId, cardElement);
  });
  if (item.likes.some((like) => like._id === userId)) {
    cardLikeButton.classList.add("card__like-button_is-active");
  };
  cardLikeButton.addEventListener("click", () =>
    likeCard(cardId, userId, item.likes._id, cardLikeButton, likeCounter)
  );
  cardImage.addEventListener("click", () => {
    openImage(item.link, item.name);
  });
  return cardElement;
};

export function likeCard(cardId, userId, item, cardLikeButton, likeCounter) {
  if (cardLikeButton.classList.contains("card__like-button_is-active")) {
    deleteLikeCard(cardId)
      .then((res) => {
        cardLikeButton.classList.toggle("card__like-button_is-active");
        likeCounter.textContent = res.likes.length;
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    putLikeCard(cardId)
      .then((res) => {
        cardLikeButton.classList.toggle("card__like-button_is-active");
        likeCounter.textContent = res.likes.length;
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

export function deleteCard(cardId, card) {
  deleteDataCard(cardId)
    .then(() => {
      card.remove();
    })
    .catch((err) => {
      console.log(err);
    });
};