import { $authHost, $host } from "./index";

export const fetchCourses = async (userId) => {
  const { data } = await $authHost.get(`api/courses/${userId}`);
  return data;
};

// export const login = async (email, password) => {
//   const { data } = await $host.post("api/user/login", { email, password });
//   localStorage.setItem("token", data.token);

//   return jwt_decode(data.token);
// };
