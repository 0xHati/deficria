import styles from "./TimeFrameSelector.module.scss";

const Item = ({ isActive, children, onClick }) => {
  return (
    <li
      onClick={onClick}
      className={`${styles.timeFrame} ${isActive ? styles["timeFrame--active"] : ""}`}>
      {children}
    </li>
  );
};

export const TimeFrameSelector = ({ timeFrames, selectedTimeFrame, onClick }) => {
  const isActive = (itemTimeFrame) => itemTimeFrame === selectedTimeFrame;
  return (
    <ul className={styles.timeFrameSelector}>
      {timeFrames.map(([key, value]) => {
        return (
          <Item
            key={key}
            isActive={isActive(key)}
            onClick={onClick.bind(null, key)}>
            {value}
          </Item>
        );
      })}
    </ul>
  );
};
