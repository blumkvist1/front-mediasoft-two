import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  lessons: [],
  selectedLesson: {},
};

export const lessonSlice = createSlice({
  name: "course",
  initialState,
  reducers: {
    setLessons: (state, action) => {
      state.lessons = action.payload;
    },
    setSelectedLesson: (state, action) => {
      state.selectedLesson = action.payload;
    },
  },
});

export const { setLessons, setSelectedLesson } = lessonSlice.actions;

export default lessonSlice;
