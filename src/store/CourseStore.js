import { makeAutoObservable } from "mobx";

export default class CourseStore {
  constructor() {
    this._courses = [];
    this._selectedCourse = {};

    makeAutoObservable(this);
  }

  setCourses(courses) {
    this._courses = courses;
  }

  get courses() {
    return this._courses;
  }

  setSelectedCourse(course) {
    this._selectedCourse = course;
  }

  get selectedCourse() {
    return this._selectedCourse;
  }
}
