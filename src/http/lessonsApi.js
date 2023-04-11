import { $authHost, $host } from "./index";

export const fetchLessons = async (name) => {
  const { data } = await $authHost.get("api/" + name);
  return data;
};

export const fetchLesson = async (id, name) => {
  const { data } = await $authHost.get("api/" + name + "/lesson/" + id);
  return data;
};

export const createLesson = async (lesson, name) => {
  const { data } = await $authHost.post("api/" + name + "/add_lesson", {
    name: lesson.name,
    number: lesson.number,
    video: lesson.video,
    presentation: lesson.presentation,
    datetime: lesson.dateTime,
  });
  return data;
};
