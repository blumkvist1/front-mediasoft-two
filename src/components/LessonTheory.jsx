import React from "react";
import { List, Avatar, Empty } from "antd";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";

const data = [
  {
    title: "Полезная ссылка №1",
  },
  {
    title: "Полезная ссылка №2",
  },
  {
    title: "Полезная ссылка №3",
  },
  {
    title: "Полезная ссылка №4",
  },
];

const LessonTheory = () => {
  const selectedLesson = useSelector((state) => state.lesson);
  const lesson = selectedLesson.selectedLesson;
  let { id, name } = useParams();
  return (
    <>
      <div>
        <h1> Об уроке</h1>
        <p>
          Информация об уроке Информация об уроке Информация об уроке Lorem
          ipsum, dolor sit amet consectetur adipisicing elit. Ex, hic? Excepturi
          temporibus magni placeat fugit eos aspernatur sequi, ratione maxime
          expedita recusandae! Voluptates blanditiis porro fugit ad, quam neque
          ex.
        </p>
      </div>
      <br />
      <div>
        <h1>Видеозапись урока</h1>
        <>
          {lesson.video.includes("youtu.be") ? (
            <iframe
              width="1080"
              height="630"
              src={lesson.video.replace("youtu.be", "www.youtube.com/embed")}
              allow="fullscreen"
              title="video"
            ></iframe>
          ) : (
            <Empty description="Видео в данный момент недоступно, пожалуйста перезвоните позднее" />
          )}
        </>
      </div>
      <br />
      <br />
      <div>
        <h1>Материалы урока</h1>
        <Link to="">{lesson.presentation}</Link>
      </div>
      <br />
      <br />
      <h1> Полезные ссылки</h1>
      <List
        itemLayout="horizontal"
        dataSource={data}
        renderItem={(item) => (
          <Link to="">
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar src="https://joesch.moe/api/v1/random" />}
                title={item.title}
                description="Ant Design, a design language for background applications, is refined by Ant UED Team"
              />
            </List.Item>
          </Link>
        )}
      />
    </>
  );
};

export default LessonTheory;
