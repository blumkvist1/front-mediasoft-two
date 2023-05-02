import React from "react";
import { Link, Outlet, useLoaderData } from "react-router-dom";
import { Card, Layout, Menu, theme } from "antd";
import { fetchLesson } from "../http/lessonsApi";
import { useSelector } from "react-redux";
import { Content } from "antd/es/layout/layout";

const items = [
  {
    key: "1",
    label: <Link to="theory">Теория</Link>,
  },
  {
    key: "2",
    label: <Link to="homework">Домашнее задание</Link>,
    //children: `Пока пусто возможно прикрепление файла(фото) или текстовый ответ или ссылка(которая потом становится кликабельной) или еще какая нибудь хрень`,
  },
  {
    key: "3",
    label: <Link to="testing">Задачи</Link>,
    //children: <Testing />,
  },
];

export async function loader({ params }) {

  const lesson = await fetchLesson(params.id, params.name);
  return { lesson };
}

const Lesson = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const course = useSelector((state) => state.course);

  const { lesson } = useLoaderData();

  return (
    <Card
      title={`Урок №${lesson.number} ${lesson.name} для курса ${course.selectedCourse.name}`}
    >
      <Layout>
        <Menu mode="horizontal" items={items} defaultSelectedKeys={"1"} />
        <Content
          style={{
            padding: 16,
            background: colorBgContainer,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Card>
  );
};

export default Lesson;
