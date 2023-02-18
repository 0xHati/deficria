import { useRouteError } from "react-router-dom";
import Layout from "../Layout/Layout";
import styles from "./Error.module.scss";

const NotFound = () => {
  const error = useRouteError();
  console.log(error);
  return (
    <>
      <p>
        {error.status} {error.statusText}
      </p>
    </>
  );
};

export default NotFound;
