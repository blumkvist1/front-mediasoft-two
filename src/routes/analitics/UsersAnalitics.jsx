import React, { useEffect } from "react";
import { fetchUsersAnalitics } from "../../http/analiticsApi";
import { Table, Progress } from "antd";
import { useLoaderData } from "react-router-dom";

const columns = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Имя",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Фамилия",
    dataIndex: "lastname",
    key: "lastname",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Зарегистрирован",
    dataIndex: "createdAt",
    key: "createdAt",
    render: (text) => {
      let date = new Date(Date.parse(text));
      date = date.toLocaleDateString("en-US");
      return <a style={{ color: "black" }}>{date}</a>;
    },
  },
  {
    title: "Кол-во курсов",
    dataIndex: "courses_count",
    key: "courses_count",
  },
];

export async function loader() {
  const data = await fetchUsersAnalitics();
  return { data };
}

const UsersAnalitics = () => {
  const { data } = useLoaderData();

  return (
    <div>
      <Table dataSource={data} columns={columns} />
    </div>
  );
};

export default UsersAnalitics;
