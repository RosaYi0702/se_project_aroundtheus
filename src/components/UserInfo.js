export default class UserInfo {
  constructor(nameSelector, descriptionSelector, avatarSelector) {
    this._nameElement = document.querySelector(nameSelector);
    this._jobElement = document.querySelector(descriptionSelector);
    this._avatarElement = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      job: this._jobElement.textContent,
    };
  }
  setUserInfo(userData) {
    this._nameElement.textContent = userData.name;
    this._jobElement.textContent = userData.description;
  }
  setUserAvatar(userData) {
    this._avatarElement.src = userData.avatar;
  }
}
