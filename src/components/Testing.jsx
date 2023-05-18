import React from "react";
import { Button, Row, Col, Empty, message, Tabs } from "antd";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { fetchTesting } from "../http/testingApi";
import Task from "./Task";

const Testing = () => {
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

  return (
    <>
      {testingData ? (
        <>
          {tasks.length ? (
            <>
              <Tabs
                onChange={(value) => {
                  setCurrent(Number(value));
                }}
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
                  marginTop: 16,
                }}
              >
                <Row>
                  <Col span={8}>
                    <div>
                      {current > 0 && (
                        <Button
                          style={{
                            marginRight: 8,
                          }}
                          onClick={() => prev()}
                        >
                          Предыдуший
                        </Button>
                      )}
                      {current < tasks.length - 1 && (
                        <Button type="primary" onClick={() => next()}>
                          Следующий
                        </Button>
                      )}
                    </div>
                  </Col>
                  <Col offset={8} span={8}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "flex-end",
                      }}
                    >
                      <Button
                        type="primary"
                        style={{}}
                        onClick={() =>
                          message.success("Ваши ответы отправлены!")
                        }
                      >
                        Отправить
                      </Button>
                    </div>
                  </Col>
                </Row>
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
