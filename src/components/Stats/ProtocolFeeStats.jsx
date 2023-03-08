import { calculateFeeStats } from "../../utils/helpers";
import { fetchData } from "../../utils/helpers";
import { useQuery } from "react-query";
import defillama from "defillama-api";
import { slug } from "../../utils/helpers";
import Card from "../Card";
import styles from "./Stat.module.scss";
import Stat from "./Stat";

import { useState } from "react";

const ProtocolFeeStats = ({ data, protocol }) => {
  const [selectedTimeFrame, setSelectedTimeFrame] = useState("total24h");
  const { data: feeData } = useQuery(["fees"], () => fetchData(defillama.feesRevenue.all()));

  const feeStats = calculateFeeStats(feeData).find((item) => slug(item.name) === slug(protocol));

  const handleChangeTimeFrame = (timeFrame) => {
    const nextTimeFrame = getNextTimeFrame(TIMEFRAMES_LIMITED, timeFrame);
    setSelectedTimeFrame(nextTimeFrame);
  };

  const feeDay = { title: "Rank", number: feeStats[selectedTimeFrame].rank };

  return (
    <Card className={styles.container}>
      {/* <TimeFrameSelectorCompact
        timeFrame={selectedTimeFrame}
        onSetTimeFrame={handleChangeTimeFrame}
      /> */}
      <Stat {...feeDay} />
    </Card>
  );
};

export default ProtocolFeeStats;
