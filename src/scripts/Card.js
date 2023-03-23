
class Card {
  constructor(items, templateSelector, handleCardClick) {
    this._name = items.name;
    this._link = items.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
  }
  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.elements__group')
      .cloneNode(true);

    return cardElement;
  }
  generateCard() {
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector('.elements__image');
    this._likeButton = this._element.querySelector('.elements__like-button');
    this._setEventListeners();

    this._cardImage.src = this._link;
    this._element.querySelector('.elements__caption').textContent = this._name;
    this._cardImage.alt = this._name;

    return this._element;

  }


  _handleTrashButton() {
    this._element.remove();
  }

  _toggleLike() {

    this._likeButton.classList.toggle('elements__like-button_active');
  }

  _setEventListeners() {
    this._likeButton.addEventListener('click', () => {
      this._toggleLike()
    });
    this._element.querySelector('.elements__trash-button').addEventListener('click', () => this._handleTrashButton());
    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });
  }
}

export default Card