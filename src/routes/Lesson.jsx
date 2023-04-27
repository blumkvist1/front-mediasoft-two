import React from "react";
import { useLoaderData } from "react-router-dom";
import { Card, Tabs } from "antd";
import { fetchLesson } from "../http/lessonsApi";

import { useSelector } from "react-redux";
import LessonTheory from "../components/LessonTheory";
import Testing from "../components/Testing";

const items = [
  {
    key: "1",
    label: `Теория`,
    children: <LessonTheory />,
  },
  {
    key: "2",
    label: `Домашнее задание`,
    children: `Пока пусто возможно прикрепление файла(фото) или текстовый ответ или ссылка(которая потом становится кликабельной) или еще какая нибудь хрень`,
  },
  {
    key: "3",
    label: `Задачи`,
    children: <Testing />,
  },
];

export async function loader({ params }) {
  const lesson = await fetchLesson(params.id, params.name);
  return { lesson };
}

const Lesson = () => {
  const course = useSelector((state) => state.course);

  const { lesson } = useLoaderData();

  return (
    <Card
      title={`Урок №${lesson.number} ${lesson.name} для курса ${course.selectedCourse.name}`}
      extra={<p>More</p>}
    >
      <Tabs defaultActiveKey="1" items={items} />
    </Card>
  );
};

export default Lesson;
