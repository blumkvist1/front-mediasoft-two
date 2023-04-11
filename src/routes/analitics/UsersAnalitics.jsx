import React from "react";
import { fetchUsersAnalitics } from "../../http/analiticsApi";
import { Table } from "antd";
import { useLoaderData } from "react-router-dom";
import { toDate } from "../../helpers/dateTime";

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
      return <a style={{ color: "black" }}>{toDate(text)}</a>;
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
