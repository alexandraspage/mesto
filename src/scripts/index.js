import Card from './Card.js';
import FormValidator from './FormValidator.js';
import Section from './Section.js';
import PopupWithImage from './PopupWithImage.js';
import PopupWithForm from './PopupWithForm.js';
import UserInfo from './UserInfo.js';

import '../pages/index.css';



const profileForm = document.forms['profileInfo'];
const cardForm = document.forms['newCard'];
const profilePopupOpenButtonElement = document.querySelector('.profile__edit-button');

const nameInput = document.querySelector('.popup__input_type_name');
const descriptionInput = document.querySelector('.popup__input_type_description');

const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__description');


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


const addButton = document.querySelector('.profile__add-button');

const cardNameInput = document.querySelector('.popup__input_card_name');
const cardLinkInput = document.querySelector('.popup__input_card_link');


//попап картинки
const bigImagePopup = new PopupWithImage('.image-popup');

function handleCardClick(name, link) {

  bigImagePopup.openPopup(name, link);

};

bigImagePopup.setEventListeners();

const formValidationConfig = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
  spanClass: '.popup__span'
};


const infoFormValidation = new FormValidator(formValidationConfig, profileForm);
infoFormValidation.enableValidation();

const cardFormValidation = new FormValidator(formValidationConfig, cardForm);
cardFormValidation.enableValidation();

const userInfo = new UserInfo({ nameSelector: '.profile__name', jobSelector: '.profile__description' });



const profilePopup = new PopupWithForm('.profile-popup', {
  handleSubmitForm: ({ profileName, profileDescription }) => {
    userInfo.setUserInfo({ profileName, profileDescription });
    profilePopup.closePopup();
  }
});

profilePopup.setEventListeners();

profilePopupOpenButtonElement.addEventListener('click', () => {
  profilePopup.openPopup();
  infoFormValidation.resetValidation();
  descriptionInput.value = profileJob.textContent;
  nameInput.value = profileName.textContent;

});



const addCardPopup = new PopupWithForm('.card-popup', {
  handleSubmitForm: (item) => {
    const card = createCard(item);
    cardsRendered.addItem(card);
    addCardPopup.closePopup();

  }
});
addCardPopup.setEventListeners();

addButton.addEventListener('click', () => {

  addCardPopup.openPopup();
  cardNameInput.value = '';
  cardLinkInput.value = '';
  cardFormValidation.resetValidation();


})


function createCard(items) {
  const card = new Card(items, '.card-template', handleCardClick);
  return card.generateCard();
}

const cardsRendered = new Section({
  items: initialCards,
  renderer: (items) => {
    cardsRendered.addItem(createCard(items))
  }
}, '.elements');

cardsRendered.renderItems(initialCards);
