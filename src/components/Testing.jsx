import React from "react";
import { Button, message, Steps, theme } from "antd";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { fetchTesting } from "../http/testingApi";
import Task from "./Task";

const steps = [
  {
    key: "1",
    title: "Checkbox",
    content: <Task params={{ type: "checkbox" }} />,
  },
  {
    key: "2",
    title: "Radio",
    content: (
      <Task
        params={{
          type: "radio",
          optionalAnswer: ["nunber 1", "nunber 2", "nunber 3", "nunber 4"],
        }}
      />
    ),
  },
  {
    key: "3",
    title: "input",
    content: (
      <Task
        params={{
          type: "input",
          question:
            "Оень сложный вопрос на который не существует ответа и его еще не приддумали",
        }}
      />
    ),
  },
];


const Testing = () => {
  const { token } = theme.useToken();
  const [current, setCurrent] = useState(0);

  const lesson = useSelector((state) => state.lesson);

  console.log(lesson.selectedLesson)

  useEffect(() => {
   fetchTesting(lesson.selectedLesson.id).then(data => console.log(data));
  });

  const next = () => {
    setCurrent(current + 1);
  };
  const prev = () => {
    setCurrent(current - 1);
  };

  const onChange = (value) => {
    console.log("onChange:", value);
    setCurrent(value);
  };

  const items = steps.map((item) => ({
    key: item.key,
    title: item.title,
  }));

  const contentStyle = {
    lineHeight: "360px",
    color: token.colorTextTertiary,
    backgroundColor: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: `1px dashed ${token.colorBorder}`,
    marginTop: 16,
  };
  return (
    <>
      <Steps current={current} items={items} onChange={onChange} size="small" />
      <div style={contentStyle}>{steps[current].content}</div>
      <div
        style={{
          marginTop: 24,
        }}
      >
        {current < steps.length - 1 && (
          <Button type="primary" onClick={() => next()}>
            Next
          </Button>
        )}
        {current === steps.length - 1 && (
          <Button
            type="primary"
            onClick={() => message.success("Processing complete!")}
          >
            Done
          </Button>
        )}
        {current > 0 && (
          <Button
            style={{
              margin: "0 8px",
            }}
            onClick={() => prev()}
          >
            Previous
          </Button>
        )}
      </div>
    </>
  );
};
export default Testing;
