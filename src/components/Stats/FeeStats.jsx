import { TimeFrameSelectorCompact } from "../TimeFrameSelector/TimeFrameSelector";
import { getNextTimeFrame } from "../../utils/helpers";
import { useState } from "react";
import Stat from "./Stat";
import styles from "./Stat.module.scss";
import Card from "../Card";

const FeeStats = ({ data }) => {
  const feeDay = { title: "Daily Fees", number: data.total24h, percentage: data.change_1d };

  const revenueDay = { title: "Daily Revenue", number: data.dailyRevenue };
  const [selectedTimeFrame, setSelectedTimeFrame] = useState("total24h");

  const handleChangeTimeFrame = (timeFrame) => {
    const nextTimeFrame = getNextTimeFrame(TIMEFRAMES_LIMITED, timeFrame);
    setChartData(prepareData(nextTimeFrame));
    setSelectedTimeFrame(nextTimeFrame);
  };
  return (
    <Card className={styles.container}>
      {/* <TimeFrameSelectorCompact
        timeFrame={selectedTimeFrame}
        onSetTimeFrame={handleChangeTimeFrame}
      /> */}
      <Stat {...feeDay} />
      <Stat {...revenueDay} />
    </Card>
  );
};

export default FeeStats;
