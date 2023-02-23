import Card from "../../components/Card";
import styles from "./FeesDetail.module.scss";
import { formatNumberToLocale, styleNumber } from "../../utils/helpers";
import { TimeFrameSelectorCompact } from "../../components/TimeFrameSelector/TimeFrameSelector";
import { TIMEFRAMES, TIMEFRAMES_DISPLAY_SHORT } from "../../constants/timeframes";
import { useState } from "react";

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
  const [selectedTimeFrame, setSelectedTimeFrame] = useState("day");

  return (
    <Card className={styles["fee-info-container"]}>
      <TimeFrameSelectorCompact
        selected={selectedTimeFrame}
        setSelected={setSelectedTimeFrame}
      />

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
      <div className={styles["fee-info"]}>
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
    </Card>
  );
};
