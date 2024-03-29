import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  courses: [],
  selectedCourse: {},
};

export const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {
    setCourses: (state, action) => {
      state.courses = action.payload;
    },
    setSelectedCourse: (state, action) => {
      state.selectedCourse = action.payload;
    },
  },
});

export const { setCourses, setSelectedCourse } = courseSlice.actions;

export default courseSlice;
