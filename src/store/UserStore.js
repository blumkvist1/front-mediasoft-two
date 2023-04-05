import { makeAutoObservable } from "mobx";

export default class UserStore {
  constructor() {
    this._isAuth = false;
    this._user = {};
    this._userInfo = {};
    makeAutoObservable(this);
  }

  setAuth(isAuth) {
    this._isAuth = isAuth;
  }

  setUser(user) {
    this._user = user;
  }

  setUserInfo(user) {
    this._userInfo = user;
  }

  get isAuth() {
    return this._isAuth;
  }

  get user() {
    return this._user;
  }

  get userInfo() {
    return this._userInfo;
  }
}
