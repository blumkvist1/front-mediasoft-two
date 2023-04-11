import { Button, Result } from "antd";
import { useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();
  console.error(error);
  return (
    <Result
      status="404"
      title="404"
      subTitle={error.statusText || error.message}
      extra={<Button type="primary">Back Home</Button>}
    />
  );
};
export default ErrorPage;
