import { $authHost, $host } from "./index";

export const fetchCoursesAnalitics = async () => {
  try{
  const { data } = await $authHost.get(`api/analitics/courses`);
  return data;
  }
  catch (e) {
    console.log(e)
  }
};

export const fetchUsersAnalitics = async () => {
  const { data } = await $authHost.get(`api/analitics/users`);
  return data;
};
