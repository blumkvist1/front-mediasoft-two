import { $authHost, $host } from "./index";

export const fetchCoursesAnalitics = async () => {
  const { data } = await $authHost.get(`api/analitics/courses`);
  return data;
};

export const fetchUsersAnalitics = async () => {
  const { data } = await $authHost.get(`api/analitics/users`);
  return data;
};
