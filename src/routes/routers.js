import { createBrowserRouter } from "react-router-dom";
import Root from "./Root";
import CourseLessons, { loader as courseLoader } from "./CourseLessons";
import React from "react";
import Calendar from "./apps/CalendarPage";
import Kanban from "./apps/Kanban";
import Pomodoro from "./apps/Pomodoro";
import Lesson, { loader as lessonLoader } from "./Lesson";
import CourseInfo from "./CourseInfo";
import Auth from "./Auth/Auth";
import CoursesAnalitics, {loader as coursesAnaliticsLoader} from "./analitics/CoursesAnalitics";
import UserAnalitics from "./analitics/UserAnalitics";

export let authRouter = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "",
        element: (
          <img
            src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*WzMpTIP8R6gAAAAAAAAAAABkARQnAQ"
            width={1200}
            height={600}
          />
        ),
      },
      {
        path: ":name",
        loader: courseLoader,
        element: <CourseLessons />,
      },
      {
        path: ":name/lesson/:id",
        loader: lessonLoader,
        element: <Lesson />,
      },
      {
        path: ":name/info",
        element: <CourseInfo />,
      },
      {
        path: "/pomodoro",
        element: <Pomodoro />,
      },
      {
        path: "/kanban",
        element: <Kanban />,
      },
      {
        path: "/calendar",
        element: <Calendar />,
      },
      {
        path: "/user_analitics",
        element: <UserAnalitics />,
      },
      {
        path: "/courses_analitics",
        loader: coursesAnaliticsLoader, 
        element: <CoursesAnalitics/>,
      },
    ],
  },
  {
    path: "/login",
    element: <Auth />,
  },
  {
    path: "/registration",
    element: <Auth />,
  },
  {
    path: "*",
    element: <h1>404</h1>,
  },
]);

export let publicRouter = createBrowserRouter([
  {
    path: "/",
    element: <div></div>,
  },
  {
    path: "/login",
    element: <Auth />,
  },
  {
    path: "/registration",
    element: <Auth />,
  },
]);
