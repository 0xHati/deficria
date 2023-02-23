import styles from "./TimeFrameSelector.module.scss";
import { useState } from "react";

const Item = ({ isActive, children, onClick }) => {
  return (
    <li>
      <button
        onClick={onClick}
        className={`${styles.timeFrame} ${isActive ? styles["timeFrame--active"] : ""}`}>
        {children}
      </button>
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

export const TimeFrameSelectorCompact = ({ selected, setSelected }) => {
  const timeFrames = {
    day: "day",
    week: "week",
    month: "month",
  };
  const handleChangeTimeFrame = () => {
    const newSelectedTimeFrame = getNextTimeFrame(timeFrames, selected);
    setSelected(newSelectedTimeFrame);
  };

  function getNextTimeFrame(timeFrames, currentTimeFrame) {
    const keys = Object.keys(timeFrames);
    const currentIndex = keys.indexOf(currentTimeFrame);
    const nextIndex = (currentIndex + 1) % keys.length;
    return keys[nextIndex];
  }

  return (
    <div className={styles["timeframe-compact"]}>
      <span>time frame:</span>
      <button
        className={styles["timeframe-button"]}
        onClick={handleChangeTimeFrame}>
        {selected}
      </button>
    </div>
  );
};
