import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, Card, Layout } from "antd";
import React, { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import "./Auth.css";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/slices/userSlice";
import { login, registration } from "../../http/userApi";

const { Content } = Layout;

const Auth = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const location = useLocation();
  const isLogin = location.pathname === "/login";

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const fetchData = async () => {
    try {
      let data;
      if (isLogin) {
        data = await login(email, password);
        //console.log(data);
      } else {
        data = await registration(email, password);
      }
      dispatch(setUser(data));
      navigate("/");
      return data;
    } catch (e) {
      alert(e.response.data.message);
      return false;
    }
  };

  const onFinish = (values) => {
    fetchData();
  };

  return (
    <Layout style={{ height: "100vh" }}>
      <Content
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {isLogin ? (
          <Card
            title="Авторизация"
            bordered={true}
            style={{ width: 300, cursor: "default", marginBottom: 24 }}
            hoverable
          >
            <Form
              name="normal_login"
              className="login-form"
              initialValues={{
                remember: false,
              }}
              onFinish={onFinish}
              size="large"
              method="post"
            >
              <Form.Item
                name="username"
                rules={[
                  {
                    required: false,
                    message: "Please input your Username!",
                  },
                ]}
              >
                <Input
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  {
                    required: false,
                    message: "Please input your Password!",
                  },
                ]}
              >
                <Input
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Item>
              <Form.Item>
                <Form.Item name="remember" valuePropName="checked" noStyle>
                  <Checkbox>Remember me</Checkbox>
                </Form.Item>
                <p className="login-form-forgot">Forgot password</p>
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                >
                  Log in
                </Button>
                Or <NavLink to="/registration">register now!</NavLink>
              </Form.Item>
            </Form>
          </Card>
        ) : (
          <Card
            title="Регистрация"
            bordered={true}
            style={{ width: 300, cursor: "default", marginBottom: 24 }}
            hoverable
          >
            <Form
              name="normal_login"
              className="login-form"
              initialValues={{
                remember: false,
              }}
              onFinish={onFinish}
              size="large"
            >
              <Form.Item
                name="username"
                rules={[
                  {
                    required: false,
                    message: "Please input your Username!",
                  },
                ]}
              >
                <Input
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  placeholder="Username"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  {
                    required: false,
                    message: "Please input your Password!",
                  },
                ]}
              >
                <Input
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Item>
              <Form.Item>
                <Form.Item name="remember" valuePropName="checked" noStyle>
                  <Checkbox>Remember me</Checkbox>
                </Form.Item>
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                >
                  Registration
                </Button>
                Or <NavLink to="/login">login now!</NavLink>
              </Form.Item>
            </Form>
          </Card>
        )}
      </Content>
    </Layout>
  );
};
export default Auth;
