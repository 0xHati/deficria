import FeesPieChart from "../Chart/FeesPieChart/FeesPieChart";
import Card from "../Card";
import { TimeFrameSelectorCompact } from "../TimeFrameSelector/TimeFrameSelector";
import { useState, useEffect } from "react";

const FeeDistribution = ({ feeStats }) => {
  const prepareData = (timeFrame) => {
    return feeStats.map((protocol) => {
      return { name: protocol.name, y: protocol[timeFrame].percentage * 100 };
    });
  };
  const [selectedTimeFrame, setSelectedTimeFrame] = useState("day");
  const [chartData, setChartData] = useState(prepareData(selectedTimeFrame));

  // useEffect(() => {
  //   setChartData(prepareData(selectedTimeFrame));
  // }, [selectedTimeFrame]);

  return (
    <Card>
      <TimeFrameSelectorCompact
        selected={selectedTimeFrame}
        setSelected={setSelectedTimeFrame}
      />
      <FeesPieChart data={chartData} />
    </Card>
  );
};

export default FeeDistribution;
