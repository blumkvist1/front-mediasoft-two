import "../App.css";
import "antd/dist/reset.css";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  NotificationOutlined,
  MessageOutlined,
} from "@ant-design/icons";
import { Layout, theme, Badge, Space, Drawer, Avatar, Row, Col, Button } from "antd";
import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setUserInfo } from "../store/slices/userSlice";
import { getUser } from "../http/userApi";
import SideBar from "../components/SideBar/SideBar";
import Profile from "../components/Profile/Profile";
import Chat from "../components/Chat/Chat";

const { Header, Content } = Layout;

const Root = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [collapsed, setCollapsed] = useState(false);
  const [openProfile, setProfileOpen] = useState(false);
  const [openChat, setChatOpen] = useState(false);

  useEffect(() => {
    getUser(user.user.email)
      .then((data) => {
        dispatch(setUserInfo(data));
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <Layout hasSider>
      <SideBar collapsed={collapsed} />
      <Layout className="site-layout">
        <Header
          style={{
            paddingLeft: 10,
            background: colorBgContainer,
          }}
        >
          <Row align="middle">
            <Col span={6}>
              {
                <Button
                  type="text"
                  icon={
                    collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />
                  }
						onClick={() => setCollapsed(!collapsed)}
                  style={{
                    fontSize: "16px",
                    width: 64,
                    height: 64,
                  }}
                />
              }
            </Col>
            <Col span={6} offset={12}>
              <Row align="middle" justify="end">
                <Space size={15}>
                  <Badge dot>
                    <NotificationOutlined
                      style={{ fontSize: 18 }}
                      onClick={() => {}}
                    />
                  </Badge>
                  <Badge dot>
                    <MessageOutlined
                      onClick={() => setChatOpen(!openChat)}
                      style={{ fontSize: 18 }}
                      title="New Message"
                    />
                  </Badge>
                  <Row
                    style={{ height: 60, width: 150, cursor: "pointer" }}
                    justify="space-around"
                    align="top"
                    onClick={() => setProfileOpen(!openProfile)}
                    title="Profile"
                  >
                    <Avatar
                      size="large"
                      src="https://joesch.moe/api/v1/random"
                      style={{ marginTop: 10 }}
                    />
                    <p style={{ fontSize: 18 }}>Hi, {user.userInfo.name}</p>
                  </Row>
                </Space>
              </Row>
            </Col>
          </Row>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            background: colorBgContainer,
          }}
        >
          <Outlet />
        </Content>
        <>
          <Drawer
            title="Messanger"
            placement="right"
            size="large"
            onClose={() => setChatOpen(false)}
            open={openChat}
            style={{ padding: -24 }}
          >
            <Chat />
          </Drawer>
        </>
        <>
          <Drawer
            title={`Личный кабинет`}
            placement="right"
            size="default"
            onClose={() => setProfileOpen(false)}
            open={openProfile}
          >
            <Profile />
          </Drawer>
        </>
      </Layout>
    </Layout>
  );
};
export default Root;
