import { RouterProvider, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { authRouter, publicRouter } from "./routes/routers";
import { Spin } from "antd";
import { check } from "./http/userApi";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "./store/slices/userSlice";

const App = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate;

  useEffect(() => {
    check()
      .then((data) => {
        dispatch(setUser(data));
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Spin size="large" />
      </div>
    );
  }

  return <RouterProvider router={user.isAuth ? authRouter : publicRouter} />;
};
export default App;
