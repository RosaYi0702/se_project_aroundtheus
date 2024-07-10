export default class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error:${res.status}`);
  }

  /* ---------------------------------- User ---------------------------------- */
  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: this._headers,
    }).then(this._checkResponse);
  }

  editUserInfo(userData) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: userData.name,
        about: userData.description,
      }),
    }).then(this._checkResponse);
  }
  getUserAvatar() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: this._headers,
    }).then(this._checkResponse);
  }
  editUserAvatar(userData) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: userData.avatar,
      }),
    }).then(this._checkResponse);
  }
  /* ---------------------------------- Card ---------------------------------- */
  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      method: "GET",
      headers: this._headers,
    }).then(this._checkResponse);
  }

  addNewCard(cardData) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: cardData.name,
        link: cardData.link,
      }),
    }).then(this._checkResponse);
  }

  deleteCard(cardID) {
    return fetch(`${this._baseUrl}/cards/${cardID}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._checkResponse);
  }
  /* ---------------------------------- Like ---------------------------------- */

  setCardLike(cardID, method) {
    return fetch(`${this._baseUrl}/cards/${cardID}/likes`, {
      method: method,
      headers: this._headers,
    }).then(this._checkResponse);
  }
  getAppInfo() {}
}
