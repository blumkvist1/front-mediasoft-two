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
import { Link, NavLink, useLoaderData, useNavigate } from "react-router-dom";

import { createLesson, fetchLessons } from "../http/lessonsApi.js";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedLesson } from "../store/slices/lessonSlice.js";
import { toDate, toISOS, toTime } from "../helpers/dateTime.js";

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

export async function loader({ params }) {
  const courseLessons = await fetchLessons(params.name);
  return { courseLessons };
}

const CourseLessons = () => {
  const dispatch = useDispatch();
  const course = useSelector((state) => state.course);
  const { courseLessons } = useLoaderData();
  const lessons = courseLessons !== null ? courseLessons.lessons : [];
  const navigate = useNavigate();
  const click = (lessonItem) => {
    dispatch(setSelectedLesson(lessonItem));
  };

  const onFinish = ({ lesson }) => {
    lesson.name = lesson.name.trim();
    lesson.dateTime = toISOS(lesson.date, lesson.time);
    createLesson(lesson, course.selectedCourse.workname).then(navigate(""));
  };

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
        {lessons.length ? (
          lessons.map((lessonItem) => (
            <>
              <h1>Урок №{lessonItem.number}</h1>
              <Link
                to={`/${course.selectedCourse.workname}/lesson/${lessonItem.number}`}
                key={lessonItem.id}
              >
                <Card
                  key={lessonItem.id}
                  type="inner"
                  title={`${lessonItem.name}`}
                  extra={
                    <p>
                      {toDate(lessonItem.datetime) +
                        " " +
                        toTime(lessonItem.datetime)}
                    </p>
                  }
                  hoverable
                  style={{ marginBottom: 20 }}
                  onClick={click(lessonItem)}
                >
                  <p>{lessonItem.name}</p>
                </Card>
              </Link>
            </>
          ))
        ) : (
          <div>В этом курсе пока нет уроков или этого курса не существует</div>
        )}
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
                max: 15,
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
