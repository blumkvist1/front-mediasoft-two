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
import ErrorPage from "./ErrorPage";
import CoursesAnalitics, {
  loader as coursesAnaliticsLoader,
} from "./analitics/CoursesAnalitics";
import UsersAnalitics, {
  loader as usersAnaliticsLoader,
} from "./analitics/UsersAnalitics";

export let authRouter = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
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
        path: "/users_analitics",
        loader: usersAnaliticsLoader,
        element: <UsersAnalitics />,
      },
      {
        path: "/courses_analitics",
        loader: coursesAnaliticsLoader,
        element: <CoursesAnalitics />,
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
]);

export let publicRouter = createBrowserRouter([
  {
    path: "/login",
    index: true,
    element: <Auth />,
  },
  {
    path: "/registration",
    element: <Auth />,
  },
]);
