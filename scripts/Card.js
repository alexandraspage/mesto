import {closePopupByOverlay, closePopupByEsc, openPopup} from './index.js';

class Card{
    constructor(items, templateSelector){
        this._name = items.name;
        this._link = items.link;
        this._templateSelector = templateSelector;
    }
    _getTemplate() {
        const cardElement = document
        .querySelector(this._templateSelector)
        .content
        .querySelector('.elements__group')
        .cloneNode(true);
  
        return cardElement;
    }
    generateCard(){
      this._element = this._getTemplate();
      this._setEventListeners();
  
      this._element.querySelector('.elements__image').src = this._link;
      this._element.querySelector('.elements__caption').textContent = this._name;
      this._element.querySelector('.elements__image').alt = this._name;
  
      return this._element;
    }
    
  
    _handleTrashButton(){
      this._element.remove();
    }
  
    _likeCard(){
      
      this._element.querySelector('.elements__like-button').classList.toggle('elements__like-button_active');
    }
  
    _handleOpenPopup(){
      document.querySelector('.image-popup__image').src = this._link;
      document.querySelector('.image-popup__image').alt = this._name;
      document.querySelector('.image-popup__title').textContent = this._name;

      openPopup(document.querySelector('.image-popup'));
      
    }
 
    _setEventListeners(){
      this._element.querySelector('.elements__like-button').addEventListener('click', () => {
        this._likeCard()});
      this._element.querySelector('.elements__trash-button').addEventListener('click', () => this._handleTrashButton());
      this._element.querySelector('.elements__image').addEventListener('click', () => {
      this._handleOpenPopup() });
     
    
      
     
    }
  
  
  }

export default Card