import styles from "./FeeLeaderBoard.module.scss";
import { TIMEFRAMES } from "../../constants/timeframes";

const Item = ({ isActive, children, onClick }) => {
  return (
    <li
      onClick={onClick}
      className={`${styles.timeFrame} ${isActive ? styles["timeFrame--active"] : ""}`}>
      {children}
    </li>
  );
};

export const TimeFrameSelector = ({ timeFrame, onClick }) => {
  const isActive = (itemTimeFrame) => itemTimeFrame === timeFrame;

  return (
    <>
      <ul className={styles.timeFrameSelector}>
        <Item
          isActive={isActive(TIMEFRAMES.totalDay)}
          onClick={onClick.bind(null, TIMEFRAMES.totalDay)}>
          24h
        </Item>
        <Item
          isActive={isActive(TIMEFRAMES.totalWeek)}
          onClick={onClick.bind(null, TIMEFRAMES.totalWeek)}>
          7d
        </Item>
        <Item
          isActive={isActive(TIMEFRAMES.totalMonth)}
          onClick={onClick.bind(null, TIMEFRAMES.totalMonth)}>
          30d
        </Item>
        <Item
          isActive={isActive(TIMEFRAMES.total)}
          onClick={onClick.bind(null, TIMEFRAMES.total)}>
          All
        </Item>
      </ul>
    </>
  );
};
