import { FEE_DATA } from "../../constants/api";
import { FeesTable } from "../Table/FeesTable";
import { useFetcher } from "../../hooks/useFetcher";
import styles from "./FeeLeaderBoard.module.scss";
import { useState } from "react";
import { TIMEFRAMES } from "../../constants/timeframes";
import { TimeFrameSelector } from "../TimeFrameSelector/TimeFrameSelector";
import { Suspense } from "react";
import { startTransition } from "react";
import { TIMEFRAMES_DISPLAY_SHORT } from "../../constants/timeframes";

export const FeeLeaderBoard = () => {
  const { data } = useFetcher({ key: FEE_DATA.key, url: FEE_DATA.endpoint }, true);
  const [timeFrame, setTimeFrame] = useState(TIMEFRAMES.day);
  const [feeStats, setFeeStats] = useState(calculateFeeStats(data));
  const handleChangeTimeFrame = (timeFrame) => {
    startTransition(() => {
      setTimeFrame(timeFrame);
    });
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
          isExpanded={false}
          feeStats={feeStats}
          timeFrame={timeFrame}
        />
      </div>
    </Suspense>
  );
};

const calculateFeeStats = (data) => {
  const { total7d, total24h, total30d, protocols } = data;
  const sorted24h = protocols.sort((a, b) => b.total24h - a.total24h);
  const sorted7d = protocols.sort((a, b) => b.total7d - a.total7d);
  const sorted30d = protocols.sort((a, b) => b.total30d - a.total30d);

  return protocols.map((protocol) => {
    return {
      name: protocol.name,
      total24hPercentage: protocol.total24h / total24h,
      total7dPercentage: protocol.total7d / total7d,
      total30dPercentage: protocol.total30d / total30d,
      total24hRank: sorted24h.indexOf(protocol) + 1,
      total7dRank: sorted7d.indexOf(protocol) + 1,
      total30dRank: sorted30d.indexOf(protocol) + 1,
    };
  });
};
