import React, { useState } from "react";
import {
  Card,
  Button,
  Space,
  Modal,
  Form,
  Input,
  InputNumber,
  DatePicker,
  TimePicker,
} from "antd";
import { Link, NavLink, useLoaderData } from "react-router-dom";

import { fetchLessons } from "../http/lessonsApi.js";
import { useSelector, useDispatch } from "react-redux";
import { setLessons, setSelectedLesson } from "../store/slices/lessonSlice.js";

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 24,
  },
};

const validateMessages = {
  required: "Поле ${label} обязательно для заполнения!",
  types: {
    email: "${label} is not a valid email!",
    number: "${label} is not a valid number!",
  },
  number: {
    range: "${label} must be between ${min} and ${max}",
  },
};

const onFinish = (values) => {
  console.log(values);
};

export async function loader({ params }) {
  const courseLessons = await fetchLessons(params.name);
  return { courseLessons };
}

const CourseLessons = () => {
  const dispatch = useDispatch();
  const course = useSelector((state) => state.course);
  const { courseLessons } = useLoaderData();

  const lessons = courseLessons.lessons;

  const click = (lessonItem) => {
    dispatch(setSelectedLesson(lessonItem));
  };

  // useEffect(async () => {
  //   const courseLessons = await fetchLessons(course.selectedCourse.workname);
  //   const less = courseLessons.lessons;
  //   dispatch(setLessons(less));

  // }, [course.selectedCourse.workname])

  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <>
      <Card
        title={course.selectedCourse.name}
        extra={
          <Space>
            <Button type="primary" onClick={showModal}>
              Добавить урок
            </Button>
            <NavLink to={`/${course.selectedCourse.workname}/info`}>
              More
            </NavLink>
          </Space>
        }
      >
        {lessons.map((lessonItem) => (
          <Link
            to={`/${course.selectedCourse.workname}/lesson/${lessonItem.number}`}
            key={lessonItem.id}
          >
            <Card
              key={lessonItem.id}
              type="inner"
              title={`Урок №${lessonItem.number} ${lessonItem.name}`}
              extra={<p>{lessonItem.datetime}</p>}
              hoverable
              style={{ marginBottom: 20 }}
              onClick={click(lessonItem)}
            >
              <p>{lessonItem.datetime}</p>
            </Card>
          </Link>
        ))}
      </Card>
      <Modal
        title="Создание урока"
        centered
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        cancelText="Отменить"
        okText="Создать урок"
        footer={[]}
        width={700}
      >
        <br />
        <Form
          {...layout}
          name="createLesson"
          onFinish={onFinish}
          style={{
            maxWidth: 600,
          }}
          validateMessages={validateMessages}
        >
          <Form.Item
            name={["lesson", "name"]}
            label="Название урока"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name={["lesson", "number"]}
            label="Номер урока"
            rules={[
              {
                required: true,
                type: "number",
                min: 0,
                max: 99,
              },
            ]}
          >
            <InputNumber />
          </Form.Item>
          <Form.Item
            name={["lesson", "video"]}
            label="Видео URL"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={["lesson", "presentation"]}
            label="Презентация"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name={["lesson", "date"]}
            label="Дата"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <DatePicker placeholder="Выберите дату" format="DD/MM/YYYY" />
          </Form.Item>
          <Form.Item
            name={["lesson", "time"]}
            label="Время"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <TimePicker
              placeholder="Выберите время"
              format="HH:mm"
              minuteStep={15}
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              onClick={handleOk}
              confirmLoading={confirmLoading}
            >
              Создать
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default CourseLessons;
