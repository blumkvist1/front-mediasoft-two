import { Layout, Menu, theme, Input, Button, Avatar } from "antd";
import { useState } from "react";
const { Header, Content, Sider } = Layout;

const Chat = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [message, setMessage] = useState("");
  const [messageMI, setMessagesMI] = useState([]);
  const [messageA, setMessagesA] = useState([]);
  const [messageD, setMessagesD] = useState([]);
  const [messages, setMessages] = useState([]);

  const [dialog, setDialog] = useState();

  const sendMessages = (mess, dialog) => {
    if (mess.length > 0) {
      if (dialog === "Администратор") {
        const ms = [...messageA, mess];
        setMessages(ms);
        setMessagesA(ms);
        setMessage("");
      }
      if (dialog === "Максим Игоревич") {
        const ms = [...messageMI, mess];
        setMessages(ms);
        setMessagesMI(ms);
        setMessage("");
      }
      if (dialog === "Даша") {
        const ms = [...messageD, mess];
        setMessages(ms);
        setMessagesD(ms);
        setMessage("");
      }
    }
  };

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout style={{ margin: -24, minHeight: "90vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={[
            {
              key: "1",
              icon: (
                <Avatar src="https://joesch.moe/api/v1/jabala" size="small" />
              ),
              label: "Администратор",
              onClick: () => {
                return setDialog("Администратор"), setMessages(messageA);
              },
            },
            {
              key: "2",
              icon: (
                <Avatar
                  src="https://joesch.moe/api/v1/male/random"
                  size="small"
                />
              ),
              label: "Максим Игоревич",
              onClick: () => {
                return setDialog("Максим Игоревич"), setMessages(messageMI);
              },
            },
            {
              key: "3",
              icon: (
                <Avatar
                  src="https://joesch.moe/api/v1/female/random"
                  size="small"
                />
              ),
              label: "Даша",
              onClick: () => {
                return setDialog("Даша"), setMessages(messageD);
              },
            },
          ]}
        />
      </Sider>
      <Layout className="site-layout">
        <Header
          style={{
            paddingLeft: 16,
            background: colorBgContainer,
            fontSize: 24,
            fontWeight: "bold",
          }}
        >
          {dialog ? `Чат с ${dialog}` : "Откройте диалог"}
        </Header>
        <Content
          style={{
            margin: "10px 16px",
          }}
        >
          <div
            style={{
              padding: 24,
              minHeight: "calc(100vh - 160px)",
              background: colorBgContainer,
            }}
          >
            {dialog ? (
              <>
                <div
                  style={{
                    border: 1,
                    background: "#4096ff",
                    color: "white",
                    width: 250,
                    height: "auto",
                    borderRadius: 8,
                    display: "flex",
                    alignItems: "center",
                    padding: 10,
                    marginBottom: 10,
                  }}
                >
                  {dialog} is not active.
                </div>
                {messages.length > 0 ? (
                  messages.map((mess) => (
                    <div
                      style={{
                        border: 1,
                        background: "blue",
                        color: "white",
                        width: 250,
                        height: "auto",
                        borderRadius: 8,
                        display: "flex",
                        alignItems: "center",
                        padding: 10,
                        marginBottom: 10,
                        marginLeft: collapsed ? 330 : 210,
                      }}
                    >
                      {mess}
                    </div>
                  ))
                ) : (
                  <div></div>
                )}
              </>
            ) : (
              "Выберите диалог"
            )}
            <div style={{ bottom: 30, position: "fixed", marginLeft: -24 }}>
              <Input.Group
                compact
                style={{
                  display: "flex",
                  flexDirection: "row",
                  height: 60,
                  width: collapsed ? 624 : 504,
                }}
              >
                <Input
                  style={{}}
                  placeholder="Введите ваше сообщение"
                  value={message}
                  onChange={(e) => {
                    setMessage(e.target.value);
                  }}
                />
                <Button
                  type="primary"
                  style={{ height: 60 }}
                  onClick={() => {
                    sendMessages(message, dialog);
                  }}
                >
                  Отправить
                </Button>
              </Input.Group>
            </div>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};
export default Chat;
