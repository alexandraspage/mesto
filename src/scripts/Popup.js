
export default class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector)

    }
    _handleEscClose(event) {
        if (event.key === 'Escape') {
            this.closePopup(this._popup);
        }

    }



    openPopup() {
        this._popup.classList.add('popup_opened');
        document.addEventListener('keydown', (event) => {
            this._handleEscClose(event);
        });


    }

    closePopup() {
        this._popup.classList.remove('popup_opened');
        document.removeEventListener('keydown', (event) => {
            this._handleEscClose(event)
        })



    }



    setEventListeners() {
        this._closeButton = this._popup.querySelector('.popup__close-button');
        this._closeButton.addEventListener('click', () => {
            this.closePopup(this._popup);
        })

        this._popup.addEventListener('mousedown', (evt) => {
            if (evt.target.classList.contains('popup_opened')) {
                this.closePopup();
            }
        });

    }

}