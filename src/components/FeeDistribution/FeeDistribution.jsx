import FeesPieChart from "../Chart/FeesPieChart/FeesPieChart";
import Card from "../Card";
import { TimeFrameSelectorCompact } from "../TimeFrameSelector/TimeFrameSelector";
import { useState } from "react";

const FeeDistribution = ({ feeStats }) => {
  const [selectedTimeFrame, setSelectedTimeFrame] = useState("day");

  const prepareData = (timeFrame) => {
    return feeStats.map((protocol) => {
      return { name: protocol.name, y: protocol[timeFrame].percentage * 100 };
    });
  };
  const data = prepareData(selectedTimeFrame);

  return (
    <Card>
      <TimeFrameSelectorCompact
        selected={selectedTimeFrame}
        setSelected={setSelectedTimeFrame}
      />
      <FeesPieChart data={data} />
    </Card>
  );
};

export default FeeDistribution;
