import Card from "../../components/Card";
import styles from "./FeesDetail.module.scss";
import { formatNumberToLocale, getNextTimeFrame, styleNumber } from "../../utils/helpers";
import { TimeFrameSelectorCompact } from "../../components/TimeFrameSelector/TimeFrameSelector";
import { useState } from "react";
import { TIMEFRAMES_LIMITED } from "../../constants/timeframes";

const Stat = ({ title, value, className }) => {
  return (
    <p className={`${styles["fee-info__stat"]} `}>
      <span className={styles["helper"]}>{title}</span>
      <span className={`${styles.stat} ${className}`}>{value}</span>
    </p>
  );
};

//idea show rank on list
export const ProtocolFeeInfo = ({ data, feeStats }) => {
  const [selectedTimeFrame, setSelectedTimeFrame] = useState("total24h");

  const handleChangeTimeFrame = (timeFrame) => {
    const nextTimeFrame = getNextTimeFrame(TIMEFRAMES_LIMITED, timeFrame);
    setSelectedTimeFrame(nextTimeFrame);
  };

  return (
    <Card className={styles.card}>
      <TimeFrameSelectorCompact
        timeFrame={selectedTimeFrame}
        onSetTimeFrame={handleChangeTimeFrame}
        className={styles["timeframe-compact"]}
      />
      <div className={styles["fee-info"]}>
        <p className={styles["fee-info__title"]}>
          <img
            src={data.logo}
            className={styles.logo}
          />

          <span className={styles["fee-info__name"]}>{data.displayName}</span>
        </p>
        <p className={`${styles.rank} ${styles["fee-info__stat"]}`}>
          <span>#{feeStats[selectedTimeFrame].rank}</span>
        </p>
        <div className={styles["fee-info__stats"]}>
          <Stat
            title={"Fees"}
            value={formatNumberToLocale(feeStats[selectedTimeFrame].fees)}
          />
          <Stat
            title={"Change"}
            value={`${feeStats[selectedTimeFrame].change}%`}
            className={styleNumber(feeStats[selectedTimeFrame].change)}
          />
          <Stat
            title={"Fee market share"}
            value={`${(feeStats[selectedTimeFrame].percentage * 100).toFixed(2)}%`}
          />
        </div>
      </div>
    </Card>
  );
};
