import Card from "../../components/Card";
import styles from "./Fees.module.scss";
import { formatNumberToLocale, styleNumber } from "../../utils/helpers";
import { TimeFrameSelector } from "../../components/TimeFrameSelector/TimeFrameSelector";
import { TIMEFRAMES, TIMEFRAMES_DISPLAY_SHORT } from "../../constants/timeframes";
import { useState } from "react";

//idea show rank on list
export const ProtocolFeeInfo = ({ data, feeStats }) => {
  const timeFrames = {
    day: "day",
    week: "week",
    month: "month",
  };
  console.log(timeFrames);

  const [selectedTimeFrame, setSelectedTimeFrame] = useState(timeFrames.day);
  console.log(feeStats);

  const handleChangeTimeFrame = () => {
    const newSelectedTimeFrame = getNextTimeFrame(timeFrames, selectedTimeFrame);
    setSelectedTimeFrame(newSelectedTimeFrame);
  };

  return (
    <Card className={styles["fee-info-container"]}>
      <div className={styles["timeframe"]}>
        <span>time frame:</span>
        <button
          className={styles["timeframe-button"]}
          onClick={handleChangeTimeFrame}>
          {selectedTimeFrame}
        </button>
      </div>

      {/* <TimeFrameSelector
        timeFrames={Object.entries(timeFrames)}
        onClick={handleChangeTimeFrame}
        selectedTimeFrame={TIMEFRAMES.day}
      /> */}
      <p className={styles["fee-info__title"]}>
        <img
          src={data.logo}
          className={styles.logo}
        />

        <span className={styles["fee-info__name"]}>{data.displayName}</span>
      </p>
      <p className={`${styles.rank} ${styles["fee-info__stat"]}`}>
        {/* <span className={styles["helper"]}>rank</span> */}
        <span>#{feeStats[selectedTimeFrame].rank}</span>
      </p>
      <div className={styles["fee-info"]}>
        <p className={styles["fee-info__stat"]}>
          <span className={styles["helper"]}>Fees</span>
          <span className={styles.stat}>{formatNumberToLocale(feeStats[selectedTimeFrame].fees)}</span>
        </p>
        <p className={styles["fee-info__stat"]}>
          <span className={styles["helper"]}>Change</span>
          <span className={`${styles.stat} ${styleNumber(feeStats[selectedTimeFrame].change)}`}>{feeStats[selectedTimeFrame].change}%</span>
        </p>
        <p className={styles["fee-info__stat"]}>
          <span className={styles["helper"]}>Fee market share</span>
          <span className={`${styles.stat}`}>{(feeStats[selectedTimeFrame].percentage * 100).toFixed(2)}%</span>
        </p>
      </div>
    </Card>
  );
};

function getNextTimeFrame(timeFrames, currentTimeFrame) {
  const keys = Object.keys(timeFrames);
  const currentIndex = keys.indexOf(currentTimeFrame);
  const nextIndex = (currentIndex + 1) % keys.length;
  return keys[nextIndex];
}
