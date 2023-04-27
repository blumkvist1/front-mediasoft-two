import "../../App.css";
import "antd/dist/reset.css";
import {
  ProjectOutlined,
  CalendarOutlined,
  FieldTimeOutlined,
} from "@ant-design/icons";

import { FaReact, FaJava } from "react-icons/fa";
import { Layout, Menu } from "antd";
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { fetchCourses } from "../../http/coursesApi";
import { useSelector, useDispatch } from "react-redux";
import { setCourses, setSelectedCourse } from "../../store/slices/courseSlice";

const { Sider } = Layout;

const SideBar = ({ collapsed }) => {
  const course = useSelector((state) => state.course);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    fetchCourses(user.user.id).then((data) => {
      dispatch(setCourses(data));
    });
  }, [dispatch]);

  function getCourses() {
    let courses = [];
    course.courses.map((courseItem) => {
      courses.push({
        key: `course${courseItem.course.id}`,
        route: courseItem.course.workname,
        label: courseItem.course.name,
      });
    });
    return courses;
  }

  const handleClickMenuItem = (props) => {

    if (props.key.includes("course")) {
     let courseId = props.key.replace("course", "");
      dispatch(
        setSelectedCourse(
          course.courses.find((el) => el.courseId === Number(courseId))
        )
      );
    }
	 console.log(course.setSelectedCourse)
    navigate(props.item.props.route);
  };

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
      <Menu
        theme="light"
        mode="inline"
        defaultSelectedKeys={["1"]}
        onClick={(props) => handleClickMenuItem(props)}
        items={[
          {
            key: "main",
            icon: <ProjectOutlined />,
            label: "Главное о главном",
            route: "/",
          },
          {
            key: "gr1",
            label: "Мои курсы",
            type: "group",
            children: course.courses.length
              ? getCourses()
              : [{ key: "-1", label: "у вас пока нет курсов" }],
          },
          {
            key: "gr2",
            label: "Apps",
            type: "group",
            children: [
              {
                key: "calendar",
                icon: <CalendarOutlined />,
                label: "Calendar",
                route: "calendar",
              },
              {
                key: "kanban",
                icon: <ProjectOutlined />,
                label: "Kanban",
                route: "kanban",
              },
              {
                key: "timemanager",
                icon: <FieldTimeOutlined />,
                label: "TimeManager",
                route: "pomodoro",
              },
            ],
          },
          {
            key: "gr3",
            label: "Аналитика",
            type: "group",
            children: [
              {
                key: "users_analitics",
                icon: <ProjectOutlined />,
                label: "Пользователи",
                route: "users_analitics",
              },
              {
                key: "courses_analitics",
                icon: <FieldTimeOutlined />,
                label: "Курсы",
                route: "courses_analitics",
              },
            ],
          },
        ]}
      />

      {/* <Menu onClick={() => {}} style={{}} mode="inline" theme="light">
        <Menu.ItemGroup key="gr1" title="Главное">
          <Menu.Item key="igr1" icon={<FaJava />}>
            <Link to="/">
              <span>Главное о главном</span>
            </Link>
          </Menu.Item>
        </Menu.ItemGroup>
        <Menu.ItemGroup key="gr2" title="Мои курсы">
          {course.courses.length ? (
            course.courses.map((courseItem) => (
              <Menu.Item
                key={courseItem.course.id}
                icon={<FaReact />}
                onClick={() => dispatch(setSelectedCourse(courseItem.course))}
              >
                <Link to={`/${courseItem.course.workname}`}>
                  <span>{courseItem.course.name}</span>
                </Link>
              </Menu.Item>
            ))
          ) : (
            <Menu.Item key="-1">
              <div>У вас пока нет курсов</div>
            </Menu.Item>
          )}
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
        <Menu.ItemGroup key="gr4" title="Аналитика">
          <Menu.Item key="igr8" icon={<FaReact />}>
            <Link to={`/users_analitics`}>
              <span>Пользователи</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="igr9" icon={<FaReact />}>
            <Link to={`/courses_analitics`}>
              <span>Курсы</span>
            </Link>
          </Menu.Item>
        </Menu.ItemGroup>
      </Menu> */}
    </Sider>
  );
};

export default SideBar;
