import { makeAutoObservable } from "mobx";

export default class OneLessonStore {
  constructor() {
    this._lesson = {}
    makeAutoObservable(this);
  }

  setLesson(lesson) {
    this._lesson = lesson;
  }

  get lesson() {
    return this._lesson;
  }

}
