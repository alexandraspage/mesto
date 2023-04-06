
export default class Section {
    constructor({renderer}, containerSelector) {
        this._container = document.querySelector(containerSelector);
        //this._items = items;
        this._renderer = renderer;
    }
    addItem(element) {
        this._container.prepend(element);
    }
    renderItems(cards, userCurrentId) {
        //console.log(userCurrentId)
        cards.forEach((card) => {
            this._renderer(card, userCurrentId);
        })

    }
}