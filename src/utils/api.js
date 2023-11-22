class Api {
    constructor({ baseUrl, headers }) {
        this._baseUrl = baseUrl;
        this._headers = headers;
    }

    _checkResponse(res) {
        if (res.ok) {
            return res.json()
        }
        return Promise.reject(`Что-то пошло не так. Ошибка ${res.status}`);
    }

    getUserInfo() {
        const url = this._baseUrl + '/users/me';
        return fetch(url, {
            method: 'GET',
            headers: this._headers,
        })
            .then(this._checkResponse)
    }

    getInitialCards() {
        return fetch(this._baseUrl + '/cards', {
            method: 'GET',
            headers: this._headers
        })
            .then(this._checkResponse)
    }

    updateUserInfo(body) {
        return fetch(this._baseUrl + '/users/me', {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify(body)
        })
            .then(this._checkResponse);
    }

    createNewCard(data) {
        return fetch(this._baseUrl + '/cards', {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify(data)
        })
            .then(this._checkResponse)
    }

    changeLikesCardStatus(cardId, isLiked) {
        if (!isLiked) {
            return fetch(this._baseUrl + `/cards/likes/${cardId}`, {
                method: 'PUT',
                headers: this._headers,
            })
                .then(this._checkResponse)
        } else {
            return fetch(this._baseUrl + `/cards/likes/${cardId}`, {
                method: 'DELETE',
                headers: this._headers,
            })
                .then(this._checkResponse)
        }
    }

    deleteCard(cardId) {
        return fetch(this._baseUrl + `/cards/${cardId}`, {
            method: 'DELETE',
            headers: this._headers,
        })
            .then(this._checkResponse);
    }

    setAvatar(data) {
        return fetch(this._baseUrl + '/users/me/avatar', {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify(data),
        })
            .then(this._checkResponse);
    }




}




export const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-76',
    headers: {
        authorization: 'ab9c2ba5-81ee-491a-8e2e-3ceb1212a51c',
        'Content-Type': 'application/json'
    }
}); 