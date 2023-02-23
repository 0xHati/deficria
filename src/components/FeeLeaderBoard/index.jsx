import { FeesTable } from "../Table/FeesTable";
import styles from "./FeeLeaderBoard.module.scss";
import { useState } from "react";
import { TIMEFRAMES } from "../../constants/timeframes";
import { TimeFrameSelector } from "../TimeFrameSelector/TimeFrameSelector";
import { Suspense } from "react";
import { TIMEFRAMES_DISPLAY_SHORT } from "../../constants/timeframes";
import { useFees } from "../../hooks/useFees";
import { calculateFeeStats } from "../../utils/helpers";

export const FeeLeaderBoard = () => {
  const { data } = useFees();
  const [timeFrame, setTimeFrame] = useState(TIMEFRAMES.day);
  const [feeStats, setFeeStats] = useState(calculateFeeStats(data));
  const handleChangeTimeFrame = (timeFrame) => {
    setTimeFrame(timeFrame);
  };

  const timeFrames = {
    [TIMEFRAMES.day]: TIMEFRAMES_DISPLAY_SHORT.day,
    [TIMEFRAMES.week]: TIMEFRAMES_DISPLAY_SHORT.week,
    [TIMEFRAMES.month]: TIMEFRAMES_DISPLAY_SHORT.month,
    [TIMEFRAMES.all]: TIMEFRAMES_DISPLAY_SHORT.all,
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className={styles["leaderboard-fees"]}>
        <div className={styles["leaderboard-fees__header"]}>
          <h2>Leaderboard Fees</h2>
          <TimeFrameSelector
            timeFrames={Object.entries(timeFrames)}
            timeFrame={timeFrame}
            selectedTimeFrame={timeFrame}
            onClick={handleChangeTimeFrame}
          />
        </div>

        <FeesTable
          data={data.protocols}
          isSimplyfied={true}
          feeStats={feeStats}
          timeFrame={timeFrame}
        />
      </div>
    </Suspense>
  );
};
