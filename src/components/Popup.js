
export default class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
        this._handleEscClose = this._handleEscClose.bind(this);
        this._submitButton = this._popup.querySelector('.popup__submit-button');

    }
    _handleEscClose(event) {
        if (event.key === 'Escape') {
            this.closePopup(this._popup);
        }

    }



    openPopup() {
        this._popup.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleEscClose)



    }

    closePopup() {
        this._popup.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscClose);



    }

    renderLoading(isLoading) {

        if (isLoading) {
            this._submitButton.value = "Сохранение...";
        } else {
            this._submitButton.value = "Создать";
        }
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