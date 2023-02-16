
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

//делаем сердечко черным 

const toggleLike = function (evt) {
  evt.target.classList.toggle('elements__like-button_active');
}

const template = document.querySelector('#card-template');
const imagePopup = document.querySelector('.image-popup');

//создание карточки
const createCard = function (cardName, cardLink) {

  const cardElement = template.content.querySelector('.elements__group').cloneNode(true);

  cardElement.querySelector('.elements__image').src = cardLink;
  cardElement.querySelector('.elements__image').alt = cardLink;
  cardElement.querySelector('.elements__caption').textContent = cardName;

  const trashButton = cardElement.querySelector('.elements__trash-button');
  trashButton.addEventListener('click', () => {
    cardElement.remove();
  });

  const likeButton = cardElement.querySelector('.elements__like-button');
  likeButton.addEventListener('click', toggleLike);

  //Попап картинки

  const cardImage = cardElement.querySelector('.elements__image');

  cardImage.addEventListener('click', function (evt) {

    const currentCard = evt.target.closest('.elements__group');
    const currentCardImg = currentCard.querySelector('.elements__image');
    const currentCardTitle = currentCard.querySelector('.elements__caption');


    const popupPlaceImg = document.querySelector('.image-popup__image');
    const popupPlaceTitle = document.querySelector('.image-popup__title');

    popupPlaceTitle.textContent = currentCardTitle.textContent;
    popupPlaceImg.src = currentCardImg.src;
    popupPlaceImg.alt = currentCardTitle.textContent;

    openPopup(imagePopup);

  });


  return cardElement;

}

const renderCard = function (cardName, cardLink) {
  elements.prepend(createCard(cardName, cardLink));


}

initialCards.forEach((item) => {
  renderCard(item.name, item.link);

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

  renderCard(cardNameValue, cardLinkValue);

  closePopup(cardPopup);

  cardNameInput.value = '';
  cardLinkInput.value = '';


};

cardForm.addEventListener('submit', cardFormSubmitHandler);
