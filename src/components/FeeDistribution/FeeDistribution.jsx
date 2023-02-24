import Card from "../Card";
import { TimeFrameSelectorCompact } from "../TimeFrameSelector/TimeFrameSelector";
import { useState, useEffect } from "react";
import FeeDistributionChart from "../Chart/Fees/FeeDistributionChart";

const FeeDistribution = ({ feeStats, ...props }) => {
  const prepareData = (timeFrame) => {
    return feeStats.map((protocol) => {
      return { name: protocol.name, y: protocol[timeFrame].percentage * 100 };
    });
  };
  const [selectedTimeFrame, setSelectedTimeFrame] = useState("day");
  const [chartData, setChartData] = useState(prepareData(selectedTimeFrame));

  useEffect(() => {
    setChartData(prepareData(selectedTimeFrame));
  }, [selectedTimeFrame]);

  return (
    <Card className={props.className}>
      <TimeFrameSelectorCompact
        selected={selectedTimeFrame}
        setSelected={setSelectedTimeFrame}
      />
      <FeeDistributionChart data={chartData} />
    </Card>
  );
};

export default FeeDistribution;
