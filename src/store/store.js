import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./slices/userSlice";
import { courseSlice } from "./slices/courseSlice";
import { lessonSlice } from "./slices/lessonSlice";

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    course: courseSlice.reducer,
    lesson: lessonSlice.reducer,
  },
});
