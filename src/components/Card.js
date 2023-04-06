
class Card {
  constructor(items, templateSelector, handleCardClick, userCurrentId, deleteCardPopup, { handleCardLike }) {
    this._item = items;
    this._name = items.name;
    this._link = items.link;
    this._likesLength = items.likes.length;
    this._likes = items.likes;
    this._id = items._id;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._ownerId = items.owner._id;
    this._userId = userCurrentId;
    this._handleCardLike = handleCardLike;
    this._deleteCardPopup = deleteCardPopup;
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
    this._likeNumber = this._element.querySelector('.elements__like-number');
    this._setEventListeners();

    this._cardImage.src = this._link;
    this._element.querySelector('.elements__caption').textContent = this._name;
    this._cardImage.alt = this._name;
    this._likeNumber.textContent = this._likesLength;

    if (this.isCardLiked()) {
      this.makeHeartBlack()
    } else {
      this.makeHeartEmpty()
    }

    this.setTrashIcon()

    return this._element;

  }

  getCardId() {
    return this._id;
  }

  setLikesCount(data) {
    this._likes = data.likes;
    this._likeNumber.textContent = data.likes.length;
  }

  makeHeartBlack() {
    this._likeButton.classList.add('elements__like-button_active');
  }

  makeHeartEmpty() {
    this._likeButton.classList.remove('elements__like-button_active');
  }



  isCardLiked() {
    return this._likes.some((like) => {
      return like._id === this._userId
    })

  }

  setTrashIcon() {
    this._trashButton = this._element.querySelector('.elements__trash-button');
    if (this._ownerId === this._userId) {
      this._trashButton.classList.add('elements__trash-button_active');
      this._trashButton.addEventListener('click', () => {
        this._deleteCardPopup.openPopup(this._element, this._id);
      })
    } else {

    }
  }




  deleteCard() {
    this._element.remove();
  }


  _setEventListeners() {
    this._likeButton.addEventListener('click', () => {
      this._handleCardLike();


    });

    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });


  }
}

export default Card