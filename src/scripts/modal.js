// открытие попапа
export const openModal = (popup) => {
  popup.classList.toggle("popup_is-opened");
  // лисенер на esc
  document.addEventListener("keydown", closeEsc);
};

//закрытие попапа
export const closeModal = (closePopup) => {
  closePopup.classList.toggle("popup_is-opened");
  document.removeEventListener("keydown", closeEsc);
};

// закрытие по esc
export const closeEsc = (evt) => {
  if (evt.key === "Escape") {
    closeModal(document.querySelector(".popup_is-opened"));
  }
};
