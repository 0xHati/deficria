import Card from "../Card";
import { TimeFrameSelectorCompact } from "../TimeFrameSelector/TimeFrameSelector";
import { useState } from "react";
import FeeDistributionChart from "../Chart/Fees/FeeDistributionChart";
import { calculateFeeStats, getNextTimeFrame } from "../../utils/helpers";
import { TIMEFRAMES_LIMITED } from "../../constants/timeframes";
import styles from "./FeeDistribution.module.scss";

const FeeDistribution = ({ feeData, ...props }) => {
  const prepareData = (timeFrame) => {
    return calculateFeeStats(feeData).map((protocol) => {
      return { name: protocol.name, y: protocol[timeFrame].percentage * 100 };
    });
  };
  const [selectedTimeFrame, setSelectedTimeFrame] = useState("total24h");
  const [chartData, setChartData] = useState(prepareData(selectedTimeFrame));

  const handleChangeTimeFrame = (timeFrame) => {
    const nextTimeFrame = getNextTimeFrame(TIMEFRAMES_LIMITED, timeFrame);
    setChartData(prepareData(nextTimeFrame));
    setSelectedTimeFrame(nextTimeFrame);
  };

  return (
    <Card className={props.className}>
      <TimeFrameSelectorCompact
        timeFrame={selectedTimeFrame}
        onSetTimeFrame={handleChangeTimeFrame}
        className={styles["timeframe-compact"]}
      />
      <FeeDistributionChart data={chartData} />
    </Card>
  );
};

export default FeeDistribution;
