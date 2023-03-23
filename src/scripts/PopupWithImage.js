import  Popup  from "./Popup";

export default class PopupWithImage extends Popup {
    constructor(popupSelector){
        super(popupSelector);
        this._popup = document.querySelector(popupSelector);
        this._popupImage = this._popup.querySelector('.image-popup__image');
        this._popupName = this._popup.querySelector('.image-popup__title');
    }
    openPopup(name, link) {
        
        this._popupImage.src = link;
        this._popupName.textContent = name;
        this._popupImage.alt = name;

        super.openPopup();
    }

}