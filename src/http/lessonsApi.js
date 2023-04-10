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

export const sendHomeWork = async (file, name, id) => {
  let formData = new FormData();
  formData.append("file", file);
  const { data } = await $authHost.post(
    "/api/react/add_answer_homework",
    formData,
    {
      headers: {
        "Content-Type": file.type,
      },
    }
  );
  console.log(data);
  // return data;
};
