import React from "react";
import { Button, Empty, message, Steps, theme } from "antd";
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
          optionsAnswer: ["nunber 1", "nunber 2", "nunber 3", "nunber 4"],
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
  const [current, setCurrent] = useState(1);

  const lesson = useSelector((state) => state.lesson);
  let testingData = {};
  let tasks = [];

  useEffect(() => {
    fetchTesting(lesson.selectedLesson.id).then((data) => {
      testingData = data.testing;
      // testingData.tasks.map((task) => {
      //   console.log(task);
      // });
      tasks = [...testingData.tasks];
      console.log(tasks);
    });
  }, []);

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

  //   const tasks = [
  //     { key: "1", title: "gbpltw", content: "ffjfj" },
  //     { key: "1", title: "gbpltw", content: "ffjfj" },
  //   ];
  tasks = tasks.map((task) => ({
    key: task.id,
    content: (
      <Task
        params={{
          question: task.quest,
          optionsAnswer: task.optionsAnswer,
          type: task.type,
        }}
      />
    ),
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
      {testingData ? (


          <>
            <Steps
              current={current}
              items={tasks}
              onChange={onChange}
              size="small"
            />
            <div style={contentStyle}>{tasks[current].content}</div>
            <div
              style={{
                marginTop: 24,
              }}
            >
              {current < tasks.length - 1 && (
                <Button type="primary" onClick={() => next()}>
                  Next
                </Button>
              )}
              {current === tasks.length - 1 && (
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
		  ) : (
        <Empty />
      )}
    </>
  );
};
export default Testing;
