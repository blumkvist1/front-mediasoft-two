import { observer } from "mobx-react-lite";
import React, { useContext, useEffect } from "react";
import { useNavigate, redirect } from "react-router-dom";
import { Button, Empty, Space, Row } from "antd";
import { Context } from "../..";
import { getUser } from "../../http/userApi";

const Profile = observer(() => {
  const { user } = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    getUser(user.user.email)
      .then((data) => {
        console.log(data);
        user.setUserInfo(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  console.log(user.userInfo);

  const logOut = () => {
    user.setAuth(false);
    user.setUser(null);
    //redirect("/login");
    redirect("/");
  };

  return (
    <>
      {user.userInfo != undefined ? (
        <div style={{ display: "flex", justifyContent: "start" }}>
          <Space direction="vertical">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0OOKOjSzmtxdabbAdFPiCBMd8VTfJlb5Cu7fmv34k&s"
              style={{ marginBottom: 15, borderRadius: 100, marginLeft: 60 }}
            />
            <div
              style={{ fontSize: 16, display: "flex", alignItems: "center" }}
            >
              Email:
              <div
                style={{
                  fontSize: 22,
                  textShadow: "initial",
                  fontWeight: "400",
                  marginLeft: 10,
                  marginTop: -5,
                }}
              >
                {user.userInfo.email}
              </div>
            </div>
            <br />
            <div
              style={{ fontSize: 16, display: "flex", alignItems: "center" }}
            >
              Имя:
              <div
                style={{
                  fontSize: 22,
                  textShadow: "initial",
                  fontWeight: "400",
                  marginLeft: 10,
                  marginTop: -5,
                }}
              >
                {user.userInfo.name}
              </div>
            </div>
            <br />
            <div
              style={{ fontSize: 16, display: "flex", alignItems: "center" }}
            >
              Фамилия:
              <div
                style={{
                  fontSize: 22,
                  textShadow: "initial",
                  fontWeight: "400",
                  marginLeft: 10,
                  marginTop: -5,
                }}
              >
                {user.userInfo.lastname}
              </div>
            </div>
            <br />
            <div
              style={{ fontSize: 16, display: "flex", alignItems: "center" }}
            >
              Образование:
              <div
                style={{
                  fontSize: 22,
                  textShadow: "initial",
                  fontWeight: "400",
                  marginLeft: 10,
                  marginTop: -5,
                }}
              >
                {user.userInfo.education}
              </div>
            </div>
            <br />
            <div
              style={{ fontSize: 16, display: "flex", alignItems: "center" }}
            >
              Роль в системе:
              <div
                style={{
                  fontSize: 22,
                  textShadow: "initial",
                  fontWeight: "400",
                  marginLeft: 10,
                  marginTop: -5,
                }}
              >
                {user.userInfo.role}
              </div>
            </div>
            <br />
            <div
              style={{ fontSize: 16, display: "flex", alignItems: "center" }}
            >
              Телефон:
              <div
                style={{
                  fontSize: 22,
                  textShadow: "initial",
                  fontWeight: "400",
                  marginLeft: 10,
                  marginTop: -5,
                }}
              >
                {user.userInfo.phone}
              </div>
            </div>
            <br />

            <Button type="primary" onClick={logOut} size="large">
              Logout
            </Button>
          </Space>
        </div>
      ) : (
        <Empty />
      )}
    </>
  );
});

export default Profile;
