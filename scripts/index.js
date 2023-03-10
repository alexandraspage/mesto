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


//???????????? 5. ???????????????????? ????????????????.

const initialCards = [
  {
    name: '??????????',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: '?????????????????????? ??????????????',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: '??????????????',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: '????????????????',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: '???????????????????????? ??????????',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: '????????????',
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


//???????????? ???????????? ???????????????? ???????????? ?????? ?????????? ????????????????

const cardPopup = document.querySelector('.card-popup');
const addButton = document.querySelector('.profile__add-button');



addButton.addEventListener('click', function (popup) {

  cardNameInput.value = '';
  cardLinkInput.value = '';

  cardFormValidation.resetValidation();

  openPopup(cardPopup);
});

//???????????? ???????????? ???????????????? ???????????? ????????????????

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

//???????????????? ??????????


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
  errorClass: 'popup__error_visible',
  spanClass : '.popup__span'
};


const infoFormValidation = new FormValidator(formValidationConfig, profileForm);
infoFormValidation.enableValidation();

const cardFormValidation = new FormValidator(formValidationConfig, cardForm);
cardFormValidation.enableValidation();