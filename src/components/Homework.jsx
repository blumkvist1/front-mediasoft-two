import { PlusOutlined } from "@ant-design/icons";
import React from "react";
import { Card, Input, Modal, Upload, Row, Col, Space } from "antd";
import { useSelector } from "react-redux";
import { useState } from "react";
const { TextArea } = Input;

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const Homework = () => {
  const lesson = useSelector((state) => state.lesson);

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState([
    {
      uid: "-1",
      name: "image.png",
      status: "done",
      url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    },
    {
      uid: "-2",
      name: "image.png",
      status: "done",
      url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    },
    {
      uid: "-3",
      name: "image.png",
      status: "done",
      url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    },
  ]);
  const handleCancel = () => setPreviewOpen(false);
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };
  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <Card title={`Домашнее задание к уроку ${lesson.selectedLesson.id}`}>
      <div>
        <h1>Задание</h1>
        <div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus rerum
          accusamus iure natus. Perspiciatis nostrum quidem error magnam sed
          commodi, corrupti, officiis aperiam explicabo tenetur, consectetur
          asperiores libero adipisci quis!
        </div>
        <br />
        <h1>Ответ на домашнее задание</h1>
        <Row align={"top"}>
          <Space size={20}>
            <Col>
              <div style={{ marginBottom: 8 }}>Ответ:</div>
              <TextArea rows={4} style={{ width: 450 }} />
            </Col>
            <Col>
              <div style={{ marginBottom: 10 }}>Прикрепить фото решения:</div>
              <Upload
                listType="picture-card"
                fileList={fileList}
                onPreview={handlePreview}
                onChange={handleChange}
              >
                {fileList.length >= 5 ? null : uploadButton}
              </Upload>
            </Col>
          </Space>
        </Row>
        <Modal
          open={previewOpen}
          title={previewTitle}
          footer={null}
          onCancel={handleCancel}
        >
          <img
            alt="example"
            style={{
              width: "100%",
            }}
            src={previewImage}
          />
        </Modal>
      </div>
    </Card>
  );
};

export default Homework;
