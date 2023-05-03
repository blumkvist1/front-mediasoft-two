import React from "react";
import { Button, Empty, message, theme, Tabs } from "antd";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { fetchTesting } from "../http/testingApi";
import Task from "./Task";

const Testing = () => {
  const { token } = theme.useToken();
  const [current, setCurrent] = useState(0);
  const [tasks, setTasks] = useState([]);
  const [testingData, setTestingData] = useState({});

  const lesson = useSelector((state) => state.lesson);

  useEffect(() => {
    fetchTesting(lesson.selectedLesson.id).then((data) => {
      setTestingData(data.testing);
      setTasks(data.testing.tasks);
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

  console.log(tasks);
  return (
    <>
      {testingData ? (
        <>
          {tasks.length ? (
            <>
              <Tabs
                onChange={onChange}
                activeKey={`${current}`}
                tabBarExtraContent={
                  <Button
                    onClick={() =>
                      message.success(
                        "Запрос отправлен!! Спасибо, мы обработаем ваш запрос и обязательно исправим ошибку"
                      )
                    }
                  >
                    В вопросе ошибка?
                  </Button>
                }
                type="card"
                items={tasks.map((_, i) => {
                  const id = String(i);
                  return {
                    label: id,
                    key: id,
                    children: (
                      <Task
                        params={{
                          question: `${tasks[current].quest}`,
                          optionsAnswer: tasks[current].options_answer,
                          type: tasks[current].type,
                        }}
                      />
                    ),
                  };
                })}
              />
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
      ) : (
        <Empty />
      )}
    </>
  );
};
export default Testing;

// const contentStyle = {
// 	lineHeight: "360px",
// 	color: token.colorTextTertiary,
// 	backgroundColor: token.colorFillAlter,
// 	borderRadius: token.borderRadiusLG,
// 	border: `1px dashed ${token.colorBorder}`,
// 	marginTop: 16,
//  };
