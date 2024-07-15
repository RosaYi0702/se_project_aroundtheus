export default class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _request(url, options) {
    return fetch(url, options).then(this._checkResponse);
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error:${res.status}`);
  }

  /* ---------------------------------- User ---------------------------------- */
  getUserInfo() {
    return this._request(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: this._headers,
    });
  }

  editUserInfo(userData) {
    return this._request(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: userData.name,
        about: userData.description,
      }),
    });
  }

  editUserAvatar(userData) {
    return this._request(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: userData.avatar,
      }),
    });
  }
  /* ---------------------------------- Card ---------------------------------- */
  getInitialCards() {
    return this._request(`${this._baseUrl}/cards`, {
      method: "GET",
      headers: this._headers,
    });
  }

  addNewCard(cardData) {
    return this._request(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: cardData.name,
        link: cardData.link,
      }),
    });
  }

  deleteCard(cardID) {
    return this._request(`${this._baseUrl}/cards/${cardID}`, {
      method: "DELETE",
      headers: this._headers,
    });
  }
  /* ---------------------------------- Like ---------------------------------- */

  setCardLike(cardID, method) {
    return this._request(`${this._baseUrl}/cards/${cardID}/likes`, {
      method: method,
      headers: this._headers,
    });
  }
}
