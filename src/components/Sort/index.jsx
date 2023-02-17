import { FaSortDown } from "react-icons/fa";
import { FaSortUp } from "react-icons/fa";

import styles from "./Sort.module.css";

export const Sort = ({ isSorted }) => {
  return (
    <span className={styles.sort}>
      <FaSortUp className={` ${styles.icons} ${isSorted || isSorted === undefined ? "" : styles["icon--sorted"]}`} />

      <FaSortDown className={` ${styles.icons} ${!isSorted || isSorted === undefined ? "" : styles["icon--sorted"]}`} />
    </span>
  );
};
