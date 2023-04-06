import Popup from "./Popup";

export default class PopupWithForm extends Popup {
    constructor(popupSelector, { handleSubmitForm }) {
        super(popupSelector);
        this._popup = document.querySelector(popupSelector);
        this._handleSubmitForm = handleSubmitForm;
        this._popupForm = this._popup.querySelector('.popup__form');
        this._inputList = this._popup.querySelectorAll('.popup__input');

    }
    _getInputValues() {
        this._formValues = {};
        this._inputList.forEach((item) => {
            this._formValues[item.name] = item.value;

        })

        return this._formValues;


    }
    closePopup() {
        super.closePopup();
        this._popupForm.reset();

    }
    setEventListeners() {
        super.setEventListeners();
        this._popupForm.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleSubmitForm(this._getInputValues());
        })
    }
}