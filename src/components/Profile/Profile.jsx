import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Empty, Space } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { removeUser } from "../../store/slices/userSlice";

const Profile = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logOut = () => {
    dispatch(removeUser());
    navigate("/login");
  };

  return (
    <>
      {user.userInfo != undefined ? (
        <div style={{ display: "flex", justifyContent: "start" }}>
          <Space direction="vertical">
            <img
              src="https://joesch.moe/api/v1/random"
              style={{ marginLeft: 60, width: 200 }}
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
};

export default Profile;
