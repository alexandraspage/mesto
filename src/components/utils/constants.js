export const profileForm = document.forms['profileInfo'];
export const cardForm = document.forms['newCard'];
export const avatarForm = document.forms['avatar'];
export const profilePopupOpenButtonElement = document.querySelector('.profile__edit-button');
export const avatarButton = document.querySelector('.profile__avatar-button');

export const nameInput = document.querySelector('.popup__input_type_name');
export const jobInput = document.querySelector('.popup__input_type_description');

export const addButton = document.querySelector('.profile__add-button');

export const cardNameInput = document.querySelector('.popup__input_card_name');
export const cardLinkInput = document.querySelector('.popup__input_card_link');

export const formValidationConfig = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
  spanClass: '.popup__span'
};