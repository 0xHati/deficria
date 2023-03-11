import { TimeFrameSelectorCompact } from "../TimeFrameSelector/TimeFrameSelector";
import { getNextTimeFrame } from "../../utils/helpers";
import { useState } from "react";
import Stat from "./Stat";
import styles from "./Stat.module.scss";
import Card from "../Card";

const FeeStats = ({ data }) => {
  const feeDay = { title: "Today Fees", number: data.total24h, percentage: data.change_1d };

  const revenueDay = { title: "Today Revenue", number: data.dailyRevenue };
  const numberProtocols = { title: "Number of protocols", number: data.protocols.length };
  const [selectedTimeFrame, setSelectedTimeFrame] = useState("total24h");

  const handleChangeTimeFrame = (timeFrame) => {
    const nextTimeFrame = getNextTimeFrame(TIMEFRAMES_LIMITED, timeFrame);
    setChartData(prepareData(nextTimeFrame));
    setSelectedTimeFrame(nextTimeFrame);
  };
  return (
    <Card className={styles["stats-container"]}>
      {/* <TimeFrameSelectorCompact
        timeFrame={selectedTimeFrame}
        onSetTimeFrame={handleChangeTimeFrame}
      /> */}
      <Stat
        {...numberProtocols}
        isCurrency={false}
      />
      <Stat {...feeDay} />
      <Stat {...revenueDay} />
    </Card>
  );
};

export default FeeStats;
