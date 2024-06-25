export default class UserInfo {
  constructor(nameSelector, descriptionSelector) {
    this._nameElement = document.querySelector(nameSelector);
    this._jobElement = document.querySelector(descriptionSelector);
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
    console.log("Name Updated to:", this._nameElement.textContent);
    console.log("Description Updated to:", this._jobElement.textContent);
  }
}
