import styles from "./TimeFrameSelector.module.scss";
import { TIMEFRAMES_DISPLAY_LONG, TIMEFRAMES_DISPLAY_SHORT } from "../../constants/timeframes";

export const TimeFrameSelector = ({ timeFrames, timeFrame, onSetTimeFrame, displayShort = true }) => {
  const isActive = (itemTimeFrame) => itemTimeFrame === timeFrame;

  return (
    <ul className={styles.timeFrameSelector}>
      {timeFrames.map((timeFrame) => {
        return (
          <li key={timeFrame}>
            <button
              onClick={() => onSetTimeFrame(timeFrame)}
              className={`${styles.timeFrame} ${isActive(timeFrame) ? styles["timeFrame--active"] : ""}`}>
              {displayShort ? TIMEFRAMES_DISPLAY_SHORT[timeFrame] : TIMEFRAMES_DISPLAY_LONG[timeFrame]}
            </button>
          </li>
        );
      })}
    </ul>
  );
};

export const TimeFrameSelectorCompact = ({ timeFrame, onSetTimeFrame, className }) => {
  return (
    <div className={`${styles["timeframe-compact"]} ${className}`}>
      <span>time frame:</span>
      <button
        className={styles["timeframe-button"]}
        onClick={() => onSetTimeFrame(timeFrame)}>
        {TIMEFRAMES_DISPLAY_SHORT[timeFrame]}
      </button>
    </div>
  );
};
