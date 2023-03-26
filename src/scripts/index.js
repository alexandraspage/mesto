import Card from './Card.js';
import FormValidator from './FormValidator.js';
import Section from './Section.js';
import PopupWithImage from './PopupWithImage.js';
import PopupWithForm from './PopupWithForm.js';
import UserInfo from './UserInfo.js';

import '../pages/index.css';

import {
  profileForm,
  cardForm,
  profilePopupOpenButtonElement,
  nameInput,
  jobInput,
  initialCards,
  addButton,
  cardNameInput,
  cardLinkInput,
  formValidationConfig
} from './utils/constants.js'



//попап картинки
const bigImagePopup = new PopupWithImage('.image-popup');

function handleCardClick(name, link) {

  bigImagePopup.openPopup(name, link);

};

bigImagePopup.setEventListeners();


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
  
  const infoObject = userInfo.getUserInfo();
  nameInput.value = infoObject.name;
  jobInput.value = infoObject.job; 

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
