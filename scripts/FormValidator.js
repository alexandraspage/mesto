

class FormValidator {
    constructor(config, formElement) {

        this._inputSelector = config.inputSelector;
        this._submitButtonSelector = config.submitButtonSelector;
        this._inactiveButtonClass = config.inactiveButtonClass;
        this._inputErrorClass = config.inputErrorClass;
        this._errorClass = config.errorClass;

        this._formElement = formElement;
    }

    _addInputListener() {
        this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
        this._submitButton = this._formElement.querySelector(this._submitButtonSelector);
        this._inputList.forEach((item) => {
            item.addEventListener('input', () => {
                this._handleFormInput(item);
            });
        });

    }

    _disableSubmit(evt) {
        evt.preventDefault();
    }

    _handleFormInput(item) {

        this._input = item;
        this._inputId = this._input.id;
        this._errorElement = this._formElement.querySelector(`.${this._inputId}-error`);


        if (!this._input.validity.valid) {
            this._input.classList.add(this._inputErrorClass);
            this._errorElement.classList.add(this._errorClass);
            this._errorElement.textContent = this._input.validationMessage;
        } else {
            this._input.classList.remove(this._inputErrorClass);
            this._errorElement.classList.remove(this._errorClass);
            this._errorElement.textContent = '';
        }

    }

    resetValidation() {
        this._toggleButtonState();

        this._inputList.forEach((item) => {
            item.classList.remove('popup__input_type_error');

        });
        Array.from(this._formElement.querySelectorAll('.popup__span')).forEach((item) => {
            item.classList.remove('popup__error_visible');
            item.textContent = '';
        })

    };

    _toggleButtonState() {
        this._submitButton.setAttribute('disabled', 'disabled');
        this._submitButton.classList.add('popup__submit-button_disabled');
    }

    toggleButton() {

        this._isFormValid = this._formElement.checkValidity();


        this._submitButton.disabled = !this._isFormValid;
        this._submitButton.classList.toggle(this._inactiveButtonClass, !this._isFormValid);

    }

    enableValidation() {

        this._formElement.addEventListener('submit', this._disableSubmit);
        this._formElement.addEventListener('input', () => {
            this.toggleButton();
        })

        this._addInputListener();
        this.toggleButton();

    }

}

export default FormValidator