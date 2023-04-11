import React, { useEffect } from "react";
import { fetchCoursesAnalitics } from "../../http/analiticsApi";
import { Table, Progress } from "antd";
import { useLoaderData } from "react-router-dom";
import { toDate } from "../../helpers/dateTime";

const columns = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Название",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Создание",
    dataIndex: "createdAt",
    key: "createdAt",
    render: (text) => {
      return <a style={{ color: "black" }}>{toDate(text)}</a>;
    },
  },
  {
    title: "Последнее изменение",
    dataIndex: "updatedAt",
    key: "updatedAt",
    render: (text) => {
      return <a style={{ color: "black" }}>{toDate(text)}</a>;
    },
  },
  {
    title: "Кол-во пользователей",
    dataIndex: "users_count",
    key: "users_count",
  },
  {
    title: "Популярность",
    dataIndex: "popularity",
    key: "popularity",
    render: (text) => {
      if (text >= 70) {
        return (
          <Progress
            percent={text}
            size="small"
            status="active"
            strokeColor="green"
          />
        );
      } else if (text > 40 && text < 70) {
        return <Progress percent={text} size="small" />;
      } else {
        return <Progress percent={text} size="small" strokeColor="red" />;
      }
    },
  },
];

export async function loader() {
  const data = await fetchCoursesAnalitics();
  return { data };
}

const CoursesAnalitics = () => {
  const { data } = useLoaderData();

  return (
    <div>
      <Table dataSource={data} columns={columns} />
    </div>
  );
};

export default CoursesAnalitics;
