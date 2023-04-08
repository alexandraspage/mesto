import Popup from "./Popup";

export default class PopupWithSubmit extends Popup {
    constructor(popupSelector, { handleDeleteSubmit }) {
        super(popupSelector);
        this._popup = document.querySelector(popupSelector);
        this._popupForm = this._popup.querySelector('.popup__form');
        this._handleDeleteSubmit = handleDeleteSubmit;
    }

    openPopup(element, id) {
        super.openPopup();
        this._card = element;
        this._id = id;
    }
    getCard() {
        return this._card;
    }
    getCardId() {
        return this._id;
    }

    setEventListeners() {
        super.setEventListeners();
        this._popupForm.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleDeleteSubmit();

        })
    }
}