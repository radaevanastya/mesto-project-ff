const handleCloseOverlay = (event) =>
  event.target === event.currentTarget && closePopup(event.currentTarget);

function escKeyHandler(event) {
  if (event.key === "Escape") {
    closePopup(document.querySelector(".popup_is-opened"));
  }
};

export function openPopup(popup) {
  popup.classList.add("popup_is-opened");
  popup.classList.add("popup_is-animated");
  document.addEventListener("keydown", escKeyHandler);
  popup.addEventListener("mousedown", handleCloseOverlay);
};

export function closePopup(popup) {
  popup.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", escKeyHandler);
  popup.removeEventListener("mousedown", handleCloseOverlay);
};