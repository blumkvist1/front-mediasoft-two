import { $authHost, $host } from "./index";

export const fetchCourses = async () => {
  const { data } = await $authHost.get("api/courses");
  return data;
};

// export const login = async (email, password) => {
//   const { data } = await $host.post("api/user/login", { email, password });
//   localStorage.setItem("token", data.token);

//   return jwt_decode(data.token);
// };
