import React, {createContext} from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import UserStore from "./store/UserStore";
import CourseStore from "./store/CourseStore";
import LessonStore from "./store/LessonStore";
import OneLessonStore from "./store/OneLessonStore";


export const Context = createContext(null);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Context.Provider
    value={{
      user: new UserStore(),
      course: new CourseStore(),
      lesson: new LessonStore(),
      oneLesson: new OneLessonStore()
    }}
  >
    <App />
  </Context.Provider>
);
