import { useRouteError } from "react-router-dom";
import Layout from "../Layout/Layout";
import styles from "./Error.module.scss";

const NotFound = () => {
  const error = useRouteError();
  console.log(error);
  return (
    <div className={styles.container}>
      <p>
        {error.status} {error.statusText}
      </p>
    </div>
  );
};

export default NotFound;
