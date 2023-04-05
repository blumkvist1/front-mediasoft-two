import { RouterProvider, useNavigate } from "react-router-dom";
import React, { useContext, useState, useEffect } from "react";
import { authRouter, publicRouter } from "./routes/routers";
import { Spin } from "antd";
import { Context } from "./index.js";
import { observer } from "mobx-react-lite";
import { check } from "./http/userApi";

const App = observer(() => {
  const { user } = useContext(Context);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate

  useEffect(() => {
    check()
      .then((data) => {
        user.setUser(data);
        user.setAuth(true);
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
});
export default App;
