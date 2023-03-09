import Card from './Card.js';
import FormValidator from './FormValidator.js';


const profilePopupElement = document.querySelector('.profile-popup');
const profileForm = document.forms['profileInfo'];
const cardForm = document.forms['newCard'];
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
    closePopup(event.currentTarget);
  };
}

const openPopup = function (popup) {

  popup.classList.add('popup_opened');

  popup.addEventListener('mousedown', closePopupByOverlay);

  document.addEventListener('keydown', closePopupByEsc);
}

/*
function clearError(popup) {
  Array.from(popup.querySelectorAll('.popup__input')).forEach((item) => {
    item.classList.remove('popup__input_type_error');
  });
  Array.from(popup.querySelectorAll('.popup__span')).forEach((item) => {
    item.classList.remove('popup__error_visible');
    item.textContent = '';
  })
}
*/
const closePopup = function (popup) {

  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupByEsc);
  popup.removeEventListener('mousedown', closePopupByOverlay);
};

profilePopupOpenButtonElement.addEventListener('click', function (popup) {
  openPopup(profilePopupElement)
  descriptionInput.value = profileJob.textContent;
  nameInput.value = profileName.textContent;

  infoFormValidation.resetValidation();

});

profilePopupCloseButtonElement.addEventListener('click', function (popup) {

  closePopup(profilePopupElement);

});


function handleProfileFormSubmit(evt) {

  evt.preventDefault();


  profileName.textContent = nameInput.value;
  profileJob.textContent = descriptionInput.value;
  closePopup(profilePopupElement);
}

profileForm.addEventListener('submit', handleProfileFormSubmit);


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


function createCard(items) {
  const card = new Card(items, '.card-template', handleCardClick);
  return card.generateCard();
}


initialCards.forEach((item) => {

  elements.prepend(createCard(item));
});


//Делаем кнопку открытия попапа для новой карточки

const cardPopup = document.querySelector('.card-popup');
const addButton = document.querySelector('.profile__add-button');



addButton.addEventListener('click', function (popup) {

  cardNameInput.value = '';
  cardLinkInput.value = '';

  //cardPopupSubmitButton.setAttribute('disabled', 'disabled');
  //cardPopupSubmitButton.classList.add('popup__submit-button_disabled');

  cardFormValidation.resetValidation();

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


const handleCardFormSubmit = function (evt) {
  evt.preventDefault(evt);

  const cardNameValue = cardNameInput.value;
  const cardLinkValue = cardLinkInput.value;

  const newCard = {
    name: cardNameValue,
    link: cardLinkValue
  }

  createCard(newCard);
  elements.prepend(createCard(newCard));

  closePopup(cardPopup);


};

cardForm.addEventListener('submit', (evt) => {
  handleCardFormSubmit(evt);
  evt.target.reset();
});


const imagePopupImg = document.querySelector('.image-popup__image');
const imagePopupTitle = document.querySelector('.image-popup__title');

function handleCardClick(name, link) {

  imagePopupImg.src = link;
  imagePopupImg.alt = name;
  imagePopupTitle.textContent = name;

  openPopup(imagePopup);

};


const formValidationConfig = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};


const infoFormValidation = new FormValidator(formValidationConfig, profileForm);
infoFormValidation.enableValidation();

const cardFormValidation = new FormValidator(formValidationConfig, cardForm);
cardFormValidation.enableValidation();