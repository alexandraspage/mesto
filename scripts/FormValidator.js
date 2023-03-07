

class FormValidator {
    constructor(config, formElement) {
        
        this._inputSelector = config.inputSelector;
        this._submitButtonSelector = config.submitButtonSelector;
        this._inactiveButtonClass = config.inactiveButtonClass;
        this._inputErrorClass = config.inputErrorClass;
        this._errorClass = config.errorClass;

        this._formElement = document.querySelector(formElement);
    }

    _addInputListener() {
        this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
        this._inputList.forEach((item) => {
            item.addEventListener('input', () => {
                this._handleFormInput(item);
            });
        });

    }

    _disableSubmit(evt){
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

    _toggleButton() {

        this._isFormValid = this._formElement.checkValidity();
        

        this._formElement.querySelector(this._submitButtonSelector).disabled = !this._isFormValid;
        this._formElement.querySelector(this._submitButtonSelector).classList.toggle(this._inactiveButtonClass, !this._isFormValid);
        
    }

    enableValidation() {

        this._formElement.addEventListener('submit', this._disableSubmit);
        this._formElement.addEventListener('input', () => {
            this._toggleButton();
        })

        this._addInputListener();
        this._toggleButton();

    }

}

export default FormValidator