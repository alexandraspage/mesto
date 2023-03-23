
export default class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector)
    }
    openPopup() {
        this._popup.classList.add('popup_opened');

    }

    closePopup() {
        this._popup.classList.remove('popup_opened');


    }
    _handleEscClose(event) {
        if (event.key === 'Escape') {
            this._openedPopup = document.querySelector('.popup_opened');
            this.closePopup(this._openedPopup);
        }

    }


    setEventListeners() {
        this._closeButton = this._popup.querySelector('.popup__close-button');
        this._closeButton.addEventListener('click', () => {
            this.closePopup(this._popup);
        })
        document.addEventListener('keydown', (event) => {
            this._handleEscClose(event)
        });
        this._popup.addEventListener('mousedown', (evt) => {
            if (evt.target.classList.contains('popup_opened')) {
                this.closePopup();
            }
        });

    }

}