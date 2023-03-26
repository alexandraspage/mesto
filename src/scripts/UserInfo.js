export default class UserInfo {
    constructor({ nameSelector, jobSelector }) {
        this._nameInfo = document.querySelector(nameSelector);
        this._jobInfo = document.querySelector(jobSelector);
    }
    getUserInfo() {
        this._profileInfo = {};
        this._profileInfo['name'] = this._nameInfo.textContent;
        this._profileInfo['job'] = this._jobInfo.textContent;
        return this._profileInfo;
    }
    setUserInfo({ profileName, profileDescription }) {
        this._nameInfo.textContent = profileName;
        this._jobInfo.textContent = profileDescription;
    }

}