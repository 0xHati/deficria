import styles from "./Chart.module.scss";
import { Children } from "react";

const ChartContainer = ({ children }) => {
  return (
    <div className={styles.charts}>
      {Children.map(children, (child) => {
        return <div className={styles.chart}>{child}</div>;
      })}
    </div>
  );
};

export default ChartContainer;
