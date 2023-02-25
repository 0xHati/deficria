import { FeesTable } from "../Table/FeesTable";
import styles from "./FeeLeaderBoard.module.scss";
import { useState } from "react";
import { TimeFrameSelector } from "../TimeFrameSelector/TimeFrameSelector";
import { Suspense } from "react";
import { TIMEFRAMES } from "../../constants/timeframes";
import { useFees } from "../../hooks/useFees";
import { calculateFeeStats } from "../../utils/helpers";

export const FeeLeaderBoard = () => {
  const { data } = useFees();
  const [timeFrame, setTimeFrame] = useState("total24h");
  const [feeStats, setFeeStats] = useState(calculateFeeStats(data));

  const handleChangeTimeFrame = (timeFrame) => {
    setTimeFrame(timeFrame);
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className={styles["leaderboard-fees"]}>
        <div className={styles["leaderboard-fees__header"]}>
          <h2>Leaderboard Fees</h2>
          <TimeFrameSelector
            timeFrames={TIMEFRAMES}
            timeFrame={timeFrame}
            onSetTimeFrame={handleChangeTimeFrame}
          />
        </div>
        <FeesTable
          data={data.protocols}
          isExpanded={true}
          feeStats={feeStats}
          timeFrame={timeFrame}
        />
      </div>
    </Suspense>
  );
};
