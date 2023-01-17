const popupElement = document.querySelector('.popup');
const formElement = document.querySelector('.popup__form');
const popupCloseButtonElement = popupElement.querySelector('.popup__close-button');
const popupOpenButtonElement = document.querySelector('.profile__edit-button');

let nameInput = document.querySelector('.popup__input_type_name');
let descriptionInput = document.querySelector('.popup__input_type_description');

let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__description');

const openPopup = function () {

  popupElement.classList.add('popup_opened');

  descriptionInput.value = profileJob.textContent;
  nameInput.value = profileName.textContent;
}

const closePopup = function () {

  popupElement.classList.remove('popup_opened');
}

popupOpenButtonElement.addEventListener('click', openPopup);
popupCloseButtonElement.addEventListener('click', closePopup);


function changeInfo(evt) {

  evt.preventDefault();


  profileName.textContent = nameInput.value;
  profileJob.textContent = descriptionInput.value;
  closePopup();
}

formElement.addEventListener('submit', changeInfo); 
