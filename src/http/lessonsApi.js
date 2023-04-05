import { $authHost, $host } from "./index";

export const fetchLessons = async (name) => {
  const { data } = await $authHost.get("api/" + name);
  return data;
};

export const fetchLesson = async (id, name) => {
  const { data } = await $authHost.get("api/" + name + "/lesson/" + id);

  return data;
};



