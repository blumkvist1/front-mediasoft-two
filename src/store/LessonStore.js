import { makeAutoObservable } from "mobx";

export default class LessonStore {
  constructor() {
    this._lessons = [
    ];
    this._selectedLesson = {};

    makeAutoObservable(this);
  }

  setLessons(lessons) {
    this._lessons = lessons;
  }

  get lessons() {
    return this._lessons;
  }

  getLessonsByCourseId(courseId) {
    return this._lessons.filter((lesson) => lesson.courseId === courseId);
  }

  setSelectedLesson(lesson) {
    this._selectedLesson = lesson;
  }

  get selectedLesson() {
    return this._selectedLesson;
  }
}
