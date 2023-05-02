import { $authHost } from "./index";

export const fetchTesting = async (lessonId) => {
  const { data } = await $authHost.get("api/testing/" + lessonId);
  return data;
};