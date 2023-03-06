import Card from './Card.js';
import FormValidator from './FormValidator.js';


const profilePopupElement = document.querySelector('.profile-popup');
const profileFormElement = profilePopupElement.querySelector('.popup__form');
const profilePopupCloseButtonElement = profilePopupElement.querySelector('.popup__close-button');
const profilePopupOpenButtonElement = document.querySelector('.profile__edit-button');

const nameInput = document.querySelector('.popup__input_type_name');
const descriptionInput = document.querySelector('.popup__input_type_description');

const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__description');

function closePopupByEsc(event) {
  if (event.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

function closePopupByOverlay(event) {
  if (event.target === event.currentTarget) {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  };
}

const openPopup = function (popup) {

  popup.classList.add('popup_opened');

  popup.addEventListener('click', closePopupByOverlay);

  document.addEventListener('keydown', closePopupByEsc);
}

function clearError(popup) {
  Array.from(popup.querySelectorAll('.popup__input')).forEach((item) => {
    item.classList.remove('popup__input_type_error');
  });
  Array.from(popup.querySelectorAll('.popup__span')).forEach((item) => {
    item.classList.remove('popup__error_visible');
    item.textContent = '';
  })
}

const closePopup = function (popup) {

  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupByEsc);
  popup.removeEventListener('click', closePopupByOverlay);
};

profilePopupOpenButtonElement.addEventListener('click', function (popup) {
  openPopup(profilePopupElement)
  descriptionInput.value = profileJob.textContent;
  nameInput.value = profileName.textContent;
  clearError(profilePopupElement);

});

profilePopupCloseButtonElement.addEventListener('click', function (popup) {

  closePopup(profilePopupElement);
 
});


function changeInfo(evt) {

  evt.preventDefault();


  profileName.textContent = nameInput.value;
  profileJob.textContent = descriptionInput.value;
  closePopup(profilePopupElement);
}

profileFormElement.addEventListener('submit', changeInfo);


//Проект 5. Добавление карточек.

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];


const elements = document.querySelector('.elements');



const imagePopup = document.querySelector('.image-popup');


function createCard (items) {
  const card = new Card (items, '.card-template');
  return card.generateCard();
}


initialCards.forEach((item) => {
  
  elements.prepend(createCard(item));
});


//Делаем кнопку открытия попапа для новой карточки

const cardPopup = document.querySelector('.card-popup');
const addButton = document.querySelector('.profile__add-button');
const cardPopupSubmitButton = cardPopup.querySelector('.card-popup__submit-button');


addButton.addEventListener('click', function (popup) {
  cardNameInput.value = '';
  cardLinkInput.value = '';
if (cardNameInput.value === '' && cardLinkInput.value === ''){
  cardPopupSubmitButton.setAttribute('disabled','disabled');
  cardPopupSubmitButton.classList.add('popup__submit-button_disabled');
};
  clearError(cardPopup);
  openPopup(cardPopup);
});

//Делаем кнопку закрытия попапа карточек

const cardCloseButton = document.querySelector('.card-popup__close-button');
const cardNameInput = document.querySelector('.popup__input_card_name');
const cardLinkInput = document.querySelector('.popup__input_card_link');


cardCloseButton.addEventListener('click', function (popup) {
  closePopup(cardPopup);
});

const closeImagePopupButton = document.querySelector('.image-popup__close-button');
closeImagePopupButton.addEventListener('click', function (popup) {

  closePopup(imagePopup);
});

//Отправка формы
const cardForm = document.querySelector('.card-popup__form');


const cardFormSubmitHandler = function (evt) {
  evt.preventDefault();

  const cardNameValue = cardNameInput.value;
  const cardLinkValue = cardLinkInput.value;

  const newCard = {
    name: cardNameValue,
    link: cardLinkValue
  }

  createCard(newCard);
  elements.prepend(createCard(newCard));

  closePopup(cardPopup);

  cardNameInput.value = '';
  cardLinkInput.value = '';


};

cardForm.addEventListener('submit', cardFormSubmitHandler);

export {closePopupByOverlay, closePopupByEsc, openPopup};

const formValidationConfig = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

const infoFormValidation = new FormValidator(formValidationConfig, '.profile-popup__form');
infoFormValidation.enableValidation();

const cardFormValidation = new FormValidator(formValidationConfig, '.card-popup__form');
cardFormValidation.enableValidation();