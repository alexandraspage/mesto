import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';

import '../pages/index.css';

import {
  profileForm,
  cardForm,
  profilePopupOpenButtonElement,
  nameInput,
  jobInput,
  addButton,
  formValidationConfig,
  avatarButton,
  avatarForm
} from '../components/utils/constants.js'
import PopupWithSubmit from '../components/PopupWithSubmit.js';



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

const avatarFormValidation = new FormValidator(formValidationConfig, avatarForm);
avatarFormValidation.enableValidation();

const userInfo = new UserInfo({ nameSelector: '.profile__name', jobSelector: '.profile__description', avatarSelector: '.profile__avatar' });



const profilePopup = new PopupWithForm('.profile-popup', {
  handleSubmitForm: (data) => {
    profilePopup.renderLoading(true);
    api.changeUserInfo(data)
      .then((data) => {
        userInfo.setUserInfo(data);
        profilePopup.closePopup();
        profilePopup.renderLoading(false);
      })
      .catch((err) => { console.log(err) })

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

const avatarPopup = new PopupWithForm('.avatar-popup', {
  handleSubmitForm: (data) => {
    avatarPopup.renderLoading(true);
    api.changeAvatar(data)
      .then((data) => {
        userInfo.setAvatar(data);
        avatarPopup.closePopup();
        avatarPopup.renderLoading(false);
      })
      .catch((err) => { console.log(err) })
  }
});

avatarPopup.setEventListeners();

avatarButton.addEventListener('click', () => {
  avatarPopup.openPopup();
  avatarFormValidation.resetValidation();

})

const addCardPopup = new PopupWithForm('.card-popup', {
  handleSubmitForm: (item) => {
    addCardPopup.renderLoading(true);
    const newCard = api.addCard(item)
    newCard.then((data) => {
      const card = createCard(data, data.owner._id);
      cardsRendered.addItem(card);
      addCardPopup.closePopup();
      addCardPopup.renderLoading(false);
    })
      .catch((err) => { console.log(err) })
  }
});
addCardPopup.setEventListeners();

addButton.addEventListener('click', () => {

  addCardPopup.openPopup();
  cardFormValidation.resetValidation();


})


function createCard(items, userCurrentId) {
  const card = new Card(items, '.card-template', handleCardClick, userCurrentId, deleteCardPopup,
    {
      handleCardLike: () => {
        if (card.isCardLiked()) {
          
          api.deleteLike(card.getCardId())
            .then((data) => {
              card.setLikesCount(data);
              card.makeHeartEmpty();
            })
            .catch((err) => {
              console.log(err);
            })
        } else {
          api.putLike(card.getCardId())
            .then((data) => {
              card.setLikesCount(data);
              card.makeHeartBlack();
            })
            .catch((err) => { console.log(err) })
        }
      }
    });
  
  return card.generateCard();
}

const cardsRendered = new Section({
  renderer: (items, userCurrentId) => {
    cardsRendered.addItem(createCard(items, userCurrentId))

  }
}, '.elements');

const deleteCardPopup = new PopupWithSubmit('.confirm-popup',
  {
    handleDeleteSubmit: () => {
      const currentCard = deleteCardPopup.getCard();

      api.deleteCard(deleteCardPopup.getCardId())
        .then((data) => {
          currentCard.remove();
        })
        .catch((err) => { console.log(err) })

    }
  });
deleteCardPopup.setEventListeners();


//API

const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-62',
  headers: {
    'content-type': 'application/json',
    authorization: '54af3b55-0841-4bd8-b43e-31656348522b'
  }
})

Promise.all([api.getAllCards(), api.getInfo()])
  .then(([cards, user]) => {
    const userCurrentId = user._id;

    userInfo.setUserInfo(user);
    cardsRendered.renderItems(cards, userCurrentId)
  })
  .catch((err) => { console.log(err) })







