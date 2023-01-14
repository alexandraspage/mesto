const formElement = document.querySelector('.form');
const formCloseButtonElement = formElement.querySelector('.form__close-button');
const formOpenButtonElement = document.querySelector('.profile__edit-button');

let nameInput = document.querySelector('.form__input-name');
let jobInput = document.querySelector('.form__input-job');

let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__description');

const openForm = function() {

  formElement.classList.add('form_opened'); 

  profileName.value;
  profileJob.value;
  
  jobInput.value = profileJob.textContent;
  nameInput.value = profileName.textContent;
}

const closeForm = function() {

    formElement.classList.remove('form_opened'); 
  }

const closeFormFromButton = function(){

  profileName.value;
  profileJob.value;
  
  jobInput.value = profileJob.textContent;
  nameInput.value = profileName.textContent;

  formElement.classList.remove('form_opened'); 
}

formOpenButtonElement.addEventListener('click', openForm);
formCloseButtonElement.addEventListener('click', closeFormFromButton);


function changeInfo (evt){

  evt.preventDefault();

 nameInput.value;
 jobInput.value;

profileName.textContent = nameInput.value;
profileJob.textContent = jobInput.value;
closeForm();
}

formElement.addEventListener('submit', changeInfo); 
