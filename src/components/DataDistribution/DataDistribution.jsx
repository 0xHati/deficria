import Card from "../Card";
import { TimeFrameSelectorCompact } from "../TimeFrameSelector/TimeFrameSelector";
import { useState } from "react";
import DistributionChart from "../Chart/DistributionChart";
import { calculateStats, getNextTimeFrame } from "../../utils/helpers";
import { TIMEFRAMES_LIMITED } from "../../constants/timeframes";
import styles from "./DataDistribution.module.scss";

const DataDistribution = ({ data, title, ...props }) => {
  const prepareData = (timeFrame) => {
    return calculateStats(data).map((protocol) => {
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
      <DistributionChart
        data={chartData}
        title={title}
        threshold={1}
      />
    </Card>
  );
};

export default DataDistribution;
