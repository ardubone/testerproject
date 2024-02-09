import "./pages/index.css"; // импорт главного файла стилей
import { closeModal, openModal } from "./scripts/modal.js"; //импорт функции открытия и закрытия попапа
import { createCard, currentCardData, deleteCard} from "./scripts/card.js"; // импорт функций карточки
import { clearValidation, enableValidation } from "./scripts/validation.js";

// Все элементы в DOM
const profileImage = document.querySelector(".profile__image"); // Изображение профиля
const editButton = document.querySelector(".profile__edit-button"); // Кнопка редактирования
const editPopup = document.querySelector(".popup_type_edit"); // Попап редактирования профиля
const placesList = document.querySelector(".places__list"); // список карточек
const addButton = document.querySelector(".profile__add-button"); // Кнопка добавления карточки
const addPopup = document.querySelector(".popup_type_new-card"); // Попап добавления карточки
const closeButtons = document.querySelectorAll(".popup__close"); //находим все закрыть

const avatarPopup = document.querySelector(".popup_type_avatar"); // попап смены аватара
const formAvatar = document.forms.edit_avatar; // форма смены аватара
let avatar = formAvatar.elements.avatar; // инпут с аватаром

export const popupDelete = document.querySelector(".popup_type_delete"); // попап удаления
const formDelete = document.forms.delete; // форма удаления

const formEdit = document.forms.edit_profile; // форма в DOM
const title = formEdit.elements.name; //инпут имени
const description = formEdit.elements.description; //инпут работы

const popups = document.querySelectorAll(".popup"); //находим все попапы

const profileTitle = document.querySelector(".profile__title"); // имя в DOM
const profileDescription = document.querySelector(".profile__description"); // работа в DOM

const formPlace = document.forms.new_place; // форма добавдения карточки
const place = formPlace.elements.place_name; // инпут с названием
const link = formPlace.elements.link; // инпут со ссылкой

const popupImage = document.querySelector(".popup_type_image"); // попап с изображением
const srcImage = popupImage.querySelector(".popup__image"); // изображение
const captionImage = popupImage.querySelector(".popup__caption"); //описание изображения

const validationConfig = {
  inputErrorClass: 'popup__input_type_error',
  popupButtonDisabled: 'popup__button_disabled',
  popupInput:'.popup__input',
  popupButton:'.popup__button',
  popupForm: '.popup',
  //popupErrortext: '.popup__error-text'
}

//показ ошибки
export function errorLog(message) {
  console.error("Ошибка:", message);
}

//лоадинг сохранить
function showLoading(isLoading, popup) {
const button = popup.querySelector(".popup__button");
  if(isLoading) {
    button.textContent = "Сохранение...";
  }
  else {
    button.textContent = "Сохранить";
  }
}

// Анимация попапов
popups.forEach((popup) => {
  if (!popup.classList.contains("popup_is-animated")) {
    popup.classList.add("popup_is-animated");
  }
});

//Открытие карточки
function openCard(cardData) {
  // присваиваем значения попапу из value в карточке
  srcImage.src = cardData.link;
  srcImage.alt = cardData.name;
  captionImage.textContent = cardData.name;
  openModal(popupImage);
}

// заполнение формы значениями из DOM
function fillPopupEdit() {
  title.value = profileTitle.textContent;
  description.value = profileDescription.textContent;
}

// Нажатие на аватар
profileImage.addEventListener("click", () => {
  openModal(avatarPopup);
  clearValidation(avatarPopup, validationConfig);
});

// Нажатие на редактирование профиля
editButton.addEventListener("click", () => {
  openModal(editPopup);
  fillPopupEdit();
  clearValidation(editPopup, validationConfig);
});

// Нажатие на кнопку добавления карточки
addButton.addEventListener("click", () => {
  openModal(addPopup);
  clearValidation(addPopup, validationConfig);
});

// Закрытие попапа
// для каждой объявляем обработчик
closeButtons.forEach((closeButton) => {
  const popup = closeButton.closest(".popup"); // нашли родителя с нужным классом
  closeButton.addEventListener("click", () => closeModal(popup)); // закрыли попап
});

// закрытие по overlay
// для каждого попапа из всех объявляем обработчик
popups.forEach((popup) => {
  popup.addEventListener("click", (event) => {
    if (event.target === popup) {
      closeModal(popup);
    }
  });
});


function handleFormEditSubmit(evt) {
  evt.preventDefault();
  showLoading(true, editPopup);
      profileTitle.textContent = title.value;
      profileDescription.textContent = description.value;
      showLoading(false, editPopup);
      closeModal(editPopup);
}

function handleFormDeleteSubmit(evt) {
  evt.preventDefault(); 
  deleteCard(currentCardData);
  closeModal(popupDelete);
}

formDelete.addEventListener("submit", handleFormDeleteSubmit);

function handleFormAvatarSubmit(evt) {
  evt.preventDefault(); 
  showLoading(true, avatarPopup);
  profileImage.style.backgroundImage = `url('${avatar}')`;
      formAvatar.reset();
      closeModal(avatarPopup);
      showLoading(false, avatarPopup);
}
formAvatar.addEventListener("submit", handleFormAvatarSubmit);

formEdit.addEventListener("submit", handleFormEditSubmit);

function handleFormSubmitPlace(evt) {
  evt.preventDefault(); 
  showLoading(true, addPopup);
  const newData = {
    name: place.value,
    link: link.value,
    owner: {
      _id: userInfo._id
    },
    likes: [],
  };
  console.log(newData);
    placesList.prepend(createCard(newData, userInfo, openCard));
      formPlace.reset();
      closeModal(addPopup);
      showLoading(false, addPopup);
}

formPlace.addEventListener("submit", handleFormSubmitPlace);

enableValidation(validationConfig);

import { initialCards, userInfo } from "./scripts/cards.js";
function loadCards(userData, cardsData) {
  cardsData.forEach((cardData) => {
    const newCard = createCard(cardData, userData, openCard);
    placesList.append(newCard);
  });
}

export function fillData(userData) {
  profileDescription.textContent = userData.about;
  profileTitle.textContent = userData.name;
  profileImage.style.backgroundImage = `url('${userData.avatar}')`;
}

fillData(userInfo);
loadCards(userInfo, initialCards);

//testing env
const testButton = document.querySelector(".test-button"); //кнопка test
const testPopup = document.querySelector(".popup_type_test"); //попап test
const formTest = document.forms.edit_test; //форма test
const testInput = formTest.elements.test; //инпут test
const testInputError = formTest.querySelector(".test-input-error");
// Нажатие на кнопку Test
testButton.addEventListener("click", () => {
  openModal(testPopup)
})

function handleTestButton() {
  getPhoto()
  .then((data) => {
    testInput.value = data.photo.url;
  })
  .catch((err) => {
    console.log(err);
  })
}

testPopup.addEventListener('click', (event) => {
  if (event.target.tagName === 'BUTTON' && event.target.type === 'button') {
    handleTestButton();
  }
});

function handleTestSubmit(evt) {
  evt.preventDefault();
  validateTest(testInput);
}

const urlPattern = /\.(jpg|jpeg|png|gif|bmp|svg)$/i;

function validateTest(input) {
  if (!urlPattern.test(input.value)) {
    testInputError.textContent = "Это не картинка";
  } else {
    testInputError.textContent = "Это картинка";
    testInputError.style.color = "green";
  }
}

testPopup.addEventListener("submit", handleTestSubmit)

function getPhoto () {
return  fetch("https://api.slingacademy.com/v1/sample-data/photos/1")
  .then((res) => {
    if (res.ok) {
      return res.json();
    }
  })
  .catch((err) => {
    console.log(err);
})
}