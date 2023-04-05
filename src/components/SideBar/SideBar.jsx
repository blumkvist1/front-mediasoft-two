import "../../App.css";
import "antd/dist/reset.css";
import {
  ProjectOutlined,
  CalendarOutlined,
  FieldTimeOutlined,
} from "@ant-design/icons";

import { FaReact, FaJava } from "react-icons/fa";
import { Layout, Menu } from "antd";
import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../index";
import { observer } from "mobx-react-lite";
import { fetchCourses } from "../../http/coursesApi";

const { Sider } = Layout;

const SideBar = observer(({ collapsed }) => {
  const { course } = useContext(Context);

  useEffect(() => {
    fetchCourses().then((data) => {
      course.setCourses(data);
    });
  }, []);

  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      style={{ minHeight: "100vh" }}
      theme="light"
    >
      {collapsed ? (
        <div className="logo">M</div>
      ) : (
        <div className="logo">MEDIASOFT</div>
      )}
      <Menu onClick={() => {}} style={{}} mode="inline" theme="light">
        <Menu.ItemGroup key="gr1" title="Главное">
          <Menu.Item key="igr1" icon={<FaJava />}>
            <Link to="/">
              <span>Главное о главном</span>
            </Link>
          </Menu.Item>
        </Menu.ItemGroup>
        <Menu.ItemGroup key="gr2" title="Мои курсы">
          {course.courses.map((courseItem) => (
            <Menu.Item
              key={courseItem.id}
              icon={<FaReact />}
              onClick={() => course.setSelectedCourse(courseItem)}
            >
              <Link to={`/${courseItem.workname}`}>
                <span>{courseItem.name}</span>
              </Link>
            </Menu.Item>
          ))}
        </Menu.ItemGroup>
        <Menu.ItemGroup key="gr3" title="Apps">
          <Menu.Item key="igr5" icon={<CalendarOutlined />}>
            <Link to="/calendar">
              <span>Календарь</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="igr6" icon={<ProjectOutlined />}>
            <Link to="/kanban">
              <span>Kanban</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="igr7" icon={<FieldTimeOutlined />}>
            <Link to="/pomodoro">
              <span>Pomodoro</span>
            </Link>
          </Menu.Item>
        </Menu.ItemGroup>
      </Menu>
    </Sider>
  );
});

export default SideBar;
