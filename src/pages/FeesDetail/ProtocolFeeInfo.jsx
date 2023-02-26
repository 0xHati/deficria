import Card from "../../components/Card";
import styles from "./FeesDetail.module.scss";
import { formatNumberToLocale, getNextTimeFrame, styleNumber } from "../../utils/helpers";
import { TimeFrameSelectorCompact } from "../../components/TimeFrameSelector/TimeFrameSelector";
import { Suspense, useState } from "react";
import { TIMEFRAMES_LIMITED } from "../../constants/timeframes";
import { calculateFeeStats } from "../../utils/helpers";
import { fetchFeeData } from "../../api/defillama";
import { useQuery } from "react-query";
import { slug } from "../../utils/helpers";

const Stat = ({ title, value, className }) => {
  return (
    <p className={`${styles["fee-info__stat"]} `}>
      <span className={styles["helper"]}>{title}</span>
      <span className={`${styles.stat} ${className}`}>{value}</span>
    </p>
  );
};

//idea show rank on list
export const ProtocolFeeInfo = ({ data, protocol }) => {
  const [selectedTimeFrame, setSelectedTimeFrame] = useState("total24h");
  const { data: overallFeeData } = useQuery(["fees"], () => fetchFeeData());

  const feeStats = calculateFeeStats(overallFeeData).find((item) => slug(item.name) === slug(protocol));

  const handleChangeTimeFrame = (timeFrame) => {
    const nextTimeFrame = getNextTimeFrame(TIMEFRAMES_LIMITED, timeFrame);
    setSelectedTimeFrame(nextTimeFrame);
  };

  return (
    <Card className={styles.card}>
      <div className={styles.top}>
        <p className={styles.rank}>#{feeStats[selectedTimeFrame].rank}</p>

        <TimeFrameSelectorCompact
          timeFrame={selectedTimeFrame}
          onSetTimeFrame={handleChangeTimeFrame}
          className={styles["timeframe-compact"]}
        />
      </div>

      <div className={styles["fee-info"]}>
        <p className={styles["fee-info__title"]}>
          <img
            src={data.logo}
            className={styles.logo}
          />

          <span className={styles["fee-info__name"]}>{data.displayName}</span>
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
