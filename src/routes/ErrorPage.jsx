import { Result } from "antd";
import { useRouteError, NavLink } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();
  console.error(error);
  return (
    <Result
      status="404"
      title="404"
      subTitle={error.statusText || error.message}
      extra={<NavLink to="/">Back Home</NavLink>}
    />
  );
};
export default ErrorPage;
