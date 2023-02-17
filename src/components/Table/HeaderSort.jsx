import { Sort } from "../Sort";
import styles from "./Table.module.css";

export const SortedHeader = ({ headerName, isSorted }) => {
  return (
    <span className={styles.header}>
      <span>{headerName}</span>
      <Sort isSorted={isSorted} />
    </span>
  );
};
