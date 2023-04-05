import React from "react";
import { useParams } from "react-router-dom";

const CourseInfo = () => {
  let { name } = useParams();
  return <div>Info about course {name}</div>;
};

export default CourseInfo;
