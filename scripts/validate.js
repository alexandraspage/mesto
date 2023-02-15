

  function disableSubmit(event){
    event.preventDefault();
  }

  

  function enableValidation(config){
    const formList = Array.from(document.querySelectorAll(config.formSelector));

    formList.forEach((form) => {

      form.addEventListener('submit', disableSubmit);
    form.addEventListener('input', () => {
      toggleButton(form, config);
    })

    addInputListener(form, config);
    toggleButton(form, config);

    });

  }
//функция проверки валидности инпутов
  function handleFormInput(event, config){
    const input = event.target;
    const inputId = input.id;
    const errorElement = document.querySelector(`.${inputId}-error`);

    if (!input.validity.valid){
      input.classList.add(config.inputErrorClass);
      errorElement.classList.add(config.errorClass);
      errorElement.textContent = input.validationMessage;
    } else {
      input.classList.remove(config.inputErrorClass);
      errorElement.classList.remove(config.errorClass);
      errorElement.textContent = '';

    }

  }

   

  //взяли все инпуты вешаем слушатель
  function addInputListener(form, config){
    const inputList = form.querySelectorAll(config.inputSelector);
    inputList.forEach( function(item){
      item.addEventListener('input', (event) => {
        handleFormInput(event, config);
        

      });
    });
  }
//переключение стиля кнопки
function toggleButton(form, config){
  const buttonSubmit = form.querySelector(config.submitButtonSelector);
  const isFormValid = form.checkValidity();

  buttonSubmit.disabled = !isFormValid;
  buttonSubmit.classList.toggle(config.inactiveButtonClass, !isFormValid);


}



  enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit-button',
    inactiveButtonClass: 'popup__submit-button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
  }); 

