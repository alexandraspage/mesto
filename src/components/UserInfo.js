export default class UserInfo {
    constructor({ nameSelector, jobSelector, avatarSelector }) {
        this._nameInfo = document.querySelector(nameSelector);
        this._jobInfo = document.querySelector(jobSelector);
        this._avatar = document.querySelector(avatarSelector);
    }
    getUserInfo() {
        this._profileInfo = {};
        this._profileInfo['name'] = this._nameInfo.textContent;
        this._profileInfo['job'] = this._jobInfo.textContent;
        this._profileInfo['avatar'] = this._avatar.src;
        return this._profileInfo;
    }
    setUserInfo(data) {
        
        this._nameInfo.textContent = data.name;
        this._jobInfo.textContent = data.about;
        this._avatar.src = data.avatar;
        const userId = data._id;
    }
    setAvatar(data){
        console.log(data);
        this._avatar.src = data.avatar; 
    }


}