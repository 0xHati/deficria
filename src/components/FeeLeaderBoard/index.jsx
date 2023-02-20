import { FEE_DATA } from "../../constants/api";
import { FeesTable } from "../Table/FeesTable";
import { useFetcher } from "../../hooks/useFetcher";
import styles from "./FeeLeaderBoard.module.scss";
import { useState } from "react";
import { TIMEFRAMES } from "../../constants/timeframes";
import { TimeFrameSelector } from "./TimeFrameSelector";

export const FeeLeaderBoard = () => {
  const { isLoading, isError, data, error } = useFetcher(FEE_DATA);
  const [timeFrame, setTimeFrame] = useState(TIMEFRAMES.totalDay);

  const handleChangeTimeFrame = (timeFrame) => {
    setTimeFrame(timeFrame);
  };

  return (
    <div className={styles["leaderboard-fees"]}>
      <div className={styles["leaderboard-fees__header"]}>
        <h2>Leaderboard Fees</h2>
        <TimeFrameSelector
          timeFrame={timeFrame}
          onClick={handleChangeTimeFrame}
        />
      </div>

      {isLoading && <span>Loading...</span>}
      {isError && <span>{error.message}</span>}
      {!isLoading && !isError && (
        <FeesTable
          data={data.protocols}
          isExpanded={false}
          timeFrame={timeFrame}
        />
      )}
    </div>
  );
};
