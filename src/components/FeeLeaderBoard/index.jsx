import { FeesTable } from "../Table/FeesTable";
import styles from "./FeeLeaderBoard.module.scss";
import { useState } from "react";
import { TimeFrameSelector } from "../TimeFrameSelector/TimeFrameSelector";
import { Suspense } from "react";
import { TIMEFRAMES } from "../../constants/timeframes";
import { useQuery } from "react-query";
import defillama from "defillama-api";
import { fetchData } from "../../utils/helpers";

export const FeeLeaderBoard = () => {
  const { data } = useQuery(["fees"], () => fetchData(defillama.feesRevenue.all()));
  const [timeFrame, setTimeFrame] = useState("total24h");

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
          isExpanded={false}
          timeFrame={timeFrame}
        />
      </div>
    </Suspense>
  );
};
