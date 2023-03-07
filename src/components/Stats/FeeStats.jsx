import { TimeFrameSelectorCompact } from "../TimeFrameSelector/TimeFrameSelector";
import { getNextTimeFrame } from "../../utils/helpers";
import { useState } from "react";
import Stat from "./Stat";
import styles from "./Stat.module.scss";
import Card from "../Card";
import defillama from "defillama-api";
import { fetchData } from "../../utils/helpers";
import { useQuery } from "react-query";

const FeeStats = ({ data }) => {
  console.log(data);

  const feeDay = { title: "Daily Fees", number: data.total24h, percentage: data.change_1d };
  //   const feeTotal = { title: "Total Fees", number: totalFees.total24h, percentage: dailyFees.change_1d };

  const revenueDay = { title: "Daily Revenue", number: data.dailyRevenue };
  //   const totalRevenuueStatsDay = { title: "Total Fees", number: data.dailyRevenue, percentage: data.change_1d };
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
