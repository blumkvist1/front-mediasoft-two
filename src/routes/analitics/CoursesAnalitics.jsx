import React, { useEffect } from "react";
import { fetchCoursesAnalitics } from "../../http/analiticsApi";
import { Table } from "antd";
import { useLoaderData } from "react-router-dom";

const columns = [
  {
    title: "id",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "workname",
    dataIndex: "workname",
    key: "workname",
  },
  {
    title: "role",
    dataIndex: "role",
    key: "role",
  },
];

export async function loader() {
  const data = await fetchCoursesAnalitics();
  return { data };
}

const CoursesAnalitics = () => {

  const {data} = useLoaderData()
  console.log(data);

  return (
    <div>
      <Table dataSource={data} columns={columns} />
    </div>
  );
};

export default CoursesAnalitics;
