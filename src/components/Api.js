export default class Api {
    constructor(config) {
        this._url = config.url;
        this._headers = config.headers;
    }

    _checkResponse(res) {
        if (res.ok) {
            return res.json()
        }
        return Promise.reject('Произошла ошибка');
    }

    getInfo() {
        return fetch(`${this._url}/users/me`, {
            method: "GET",
            headers: this._headers
        })
            .then(this._checkResponse)
    }

    getAllCards() {
        return fetch(`${this._url}/cards`, {
            method: "GET",
            headers: this._headers,
        })
            .then(this._checkResponse)
    }
    addCard(data) {
        return fetch(`${this._url}/cards`, {
            method: "POST",
            headers: this._headers,
            body: JSON.stringify({
                name: data.name,
                link: data.link
            })
        })
            .then(this._checkResponse)
    }
    changeUserInfo(data) {

        return fetch(`${this._url}/users/me`, {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify({
                name: data.profileName,
                about: data.profileDescription
            })
        })
            .then(this._checkResponse)

    }
    changeAvatar(data) {
        return fetch(`${this._url}/users/me/avatar`, {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify({
                avatar: data.avatar
            })
        })
            .then(this._checkResponse)
    }
    putLike(cardId) {
        return fetch(`${this._url}/cards/${cardId}/likes`, {
            method: "PUT",
            headers: this._headers
        })
            .then(this._checkResponse)
    }
    deleteLike(cardId) {
        return fetch(`${this._url}/cards/${cardId}/likes`, {
            method: "DELETE",
            headers: this._headers
        })
            .then(this._checkResponse)
    }
    deleteCard(cardId) {
        return fetch(`${this._url}/cards/${cardId}`, {
            method: "DELETE",
            headers: this._headers
        })
            .then(this._checkResponse)
    }
}