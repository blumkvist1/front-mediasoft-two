import React from "react";
import { useLoaderData, useParams } from "react-router-dom";
import { Card, List, Avatar } from "antd";
import { Link } from "react-router-dom";
import { fetchLesson } from "../http/lessonsApi";

import { useSelector } from "react-redux";

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

export async function loader({ params }) {
  const lesson = await fetchLesson(params.id, params.name);
  return { lesson };
}

const Lesson = () => {
  let { id, name } = useParams();
  const course = useSelector((state) => state.course);

  const { lesson } = useLoaderData();

  return (
    <Card
      title={`Урок №${lesson.number} ${lesson.name} для курса ${course.selectedCourse.name}`}
      extra={<p>More</p>}
    >
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
        <iframe
          width="1120"
          height="630"
          src={lesson.video.replace("youtu.be", "www.youtube.com/embed")}
          // src="https://www.youtube.com/embed/OdEQQ4bjvWA"
          allow="fullscreen"
          title="video"
        ></iframe>
      </div>
      <br />
      <br />
      <div>
        <h1>Материалы урока</h1>
        <Link to="">{lesson.presentation}</Link>
      </div>

      <br />
      <br />
      <div>
        <h1>Домашнее задание</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Debitis et
          voluptates, praesentium dolorum porro sit dicta itaque optio beatae,
          numquam iste harum, eos odio quisquam eum maxime ad unde quidem!
        </p>
        <Link to="">
          ДЗ урока №{id} курса {name}
        </Link>
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
    </Card>
  );
};

export default Lesson;
