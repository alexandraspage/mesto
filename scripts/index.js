
const popupElement = document.querySelector('.popup');
const formElement = document.querySelector('.popup__form');
const popupCloseButtonElement = popupElement.querySelector('.popup__close-button');
const popupOpenButtonElement = document.querySelector('.profile__edit-button');

let nameInput = document.querySelector('.popup__input_type_name');
let descriptionInput = document.querySelector('.popup__input_type_description');

let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__description');

const openPopup = function (popup) {

  popup.classList.add('popup_opened');

}

const closePopup = function (popup) {

  popup.classList.remove('popup_opened');
}

popupOpenButtonElement.addEventListener('click', function (popup) {
  openPopup(popupElement)
  descriptionInput.value = profileJob.textContent;
  nameInput.value = profileName.textContent;

});

popupCloseButtonElement.addEventListener('click', function (popup) {

  closePopup(popupElement);
  descriptionInput.value = profileJob.textContent;
  nameInput.value = profileName.textContent;
});


function changeInfo(evt) {

  evt.preventDefault();


  profileName.textContent = nameInput.value;
  profileJob.textContent = descriptionInput.value;
  closePopup(popupElement);
}

formElement.addEventListener('submit', changeInfo);


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

const likeButton = document.querySelectorAll('.elements__like-button');

const activateLike = function (evt) {
  evt.target.classList.toggle('elements__like-button_active');
}




const createCard = function (cardName, cardLink) {
  const divGroup = document.createElement('div');
  divGroup.classList.add('elements__group');

  const img = document.createElement('img');
  img.classList.add('elements__image');
  img.src = cardLink;
  img.setAttribute('alt', `${cardName}`);

  const trashButton = document.createElement('button');
  trashButton.classList.add('elements__trash-button');
  trashButton.setAttribute('type', 'button');

  const divInfo = document.createElement('div');
  divInfo.classList.add('elements__info');

  const caption = document.createElement('h2');
  caption.classList.add('elements__caption');
  caption.innerText = cardName;

  const likeButton = document.createElement('button');
  likeButton.classList.add('elements__like-button');
  likeButton.setAttribute('type', 'button');

  likeButton.addEventListener('click', activateLike);

  //добавляем элементы
  divInfo.appendChild(caption);
  divInfo.appendChild(likeButton);
  divGroup.appendChild(img);
  divGroup.appendChild(trashButton);
  divGroup.appendChild(divInfo);

  trashButton.addEventListener('click', () => {
    divGroup.remove();
  });

  //Попап картинки

  const imagePopup = document.querySelector('.image-popup');

  img.addEventListener('click', function (evt) {

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

  const closeImagePopupButton = imagePopup.querySelector('.image-popup__close-button');
  closeImagePopupButton.addEventListener('click', function (popup) {

    closePopup(imagePopup);
  });

  return divGroup;

}

const renderCard = function (cardName, cardLink) {
  elements.prepend(createCard(cardName, cardLink));


}

initialCards.forEach((item) => {
  renderCard(item.name, item.link);

});


//Делаем кнопку открытия попапа для новой карточки активной

const cardPopup = document.querySelector('.card-popup');
const addButton = document.querySelector('.profile__add-button');


addButton.addEventListener('click', function (popup) {
  openPopup(cardPopup);
});

//Делаем кнопку закрытия попапа карточек

const cardCloseButton = document.querySelector('.card-popup__close-button');


cardCloseButton.addEventListener('click', function (popup) {
  closePopup(cardPopup);
});

//Отправка формы
const cardForm = document.querySelector('.card-popup__form')
const cardNameInput = document.querySelector('.popup__input_card_name');
const cardLinkInput = document.querySelector('.popup__input_card_link');


const formSubmitHandler = function (evt) {
  evt.preventDefault();

  const cardNameValue = cardNameInput.value;
  const cardLinkValue = cardLinkInput.value;

  renderCard(cardNameValue, cardLinkValue);

  closePopup(cardPopup);

  cardNameInput.value = '';
  cardLinkInput.value = '';


};

cardForm.addEventListener('submit', formSubmitHandler);

