import React, { createContext } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import LessonStore from "./store/LessonStore";
import OneLessonStore from "./store/OneLessonStore";
import { store } from "./store/store";
import { Provider } from "react-redux";

export const Context = createContext();

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
