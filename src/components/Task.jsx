import React, { useState } from "react";
import { Card, Row, Col, Radio, Space, Checkbox, Input } from "antd";
const { TextArea } = Input;

const Task = ({ params }) => {
  const { type, question, optionsAnswer } = params;
  const [value, setValue] = useState(0);
  const onChange = (e) => {
    //console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };
  const onChangeCheckbox = (checkedValues) => {
    //console.log("checked = ", checkedValues);
  };
  if (type === "radio") {
    return (
      <Card
        style={{
          width: "auto",
          height: "360px",
        }}
      >
        <Row gutter={[16, 16]} style={{ position: "fixed" }}>
          <Col flex={3}>
            <Card
              style={{
                height: "306px",
                width: 508,
              }}
            >
              {question}
            </Card>
          </Col>
          <Col flex={3}>
            <Card style={{ height: "306px", width: 508 }}>
              <h3>Выберите один вариант ответа</h3>
              <Radio.Group onChange={onChange} value={value}>
                <Space direction="vertical">
                  {optionsAnswer.length &&
                    optionsAnswer.map((item) => (
                      <Radio value={item}>{item}</Radio>
                    ))}
                </Space>
              </Radio.Group>
            </Card>
          </Col>
        </Row>
      </Card>
    );
  } else if (type === "checkbox") {
    return (
      <Card
        style={{
          width: "auto",
          height: "360px",
        }}
      >
        <Row gutter={[16, 16]} style={{ position: "fixed" }}>
          <Col flex={3}>
            <Card
              style={{
                height: "306px",
                width: 508,
              }}
            >
              {question}
            </Card>
          </Col>
          <Col flex={3}>
            <Card style={{ height: "306px", width: 508 }}>
              <h3>Выберите несколько вариантов ответа</h3>
              <Checkbox.Group onChange={onChangeCheckbox}>
                <Space direction="vertical">
                  {optionsAnswer.length &&
                    optionsAnswer.map((item) => (
                      <Checkbox value={item}>{item}</Checkbox>
                    ))}
                </Space>
              </Checkbox.Group>
            </Card>
          </Col>
        </Row>
      </Card>
    );
  } else {
    return (
      <Card
        style={{
          width: "auto",
          height: "360px",
        }}
      >
        <Row gutter={[16, 16]} style={{ position: "fixed" }}>
          <Col flex={3}>
            <Card
              style={{
                height: "306px",
                width: 508,
              }}
            >
              {question}
            </Card>
          </Col>
          <Col flex={3}>
            <Card style={{ height: "306px", width: 508 }}>
              <h3>Введите ваш ответ</h3>
              <TextArea
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Controlled autosize"
                autoSize={{
                  minRows: 3,
                  maxRows: 10,
                }}
              />
            </Card>
          </Col>
        </Row>
      </Card>
    );
  }
};

export default Task;
