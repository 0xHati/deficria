import { calculateFeeStats } from "../../utils/helpers";
import { fetchData, getNextTimeFrame, slug } from "../../utils/helpers";
import { useQuery } from "react-query";
import defillama from "defillama-api";
import Card from "../Card";
import styles from "./Stat.module.scss";
import Stat from "./Stat";
import { TimeFrameSelectorCompact } from "../TimeFrameSelector/TimeFrameSelector";
import { TIMEFRAMES_LIMITED } from "../../constants/timeframes";

import { useState } from "react";

const ProtocolFeeStats = ({ dataRevenue, protocol }) => {
  const [selectedTimeFrame, setSelectedTimeFrame] = useState("total24h");
  const { data: feeData } = useQuery(["fees"], () => fetchData(defillama.feesRevenue.all()));

  const feeStats = calculateFeeStats(feeData).find((item) => slug(item.name) === slug(protocol));
  // const revenueStats = calculateFeeStats(dataRevenue).find((item) => slug(item.name) === slug(protocol));

  console.log(dataRevenue);

  const handleChangeTimeFrame = (timeFrame) => {
    const nextTimeFrame = getNextTimeFrame(TIMEFRAMES_LIMITED, timeFrame);
    setSelectedTimeFrame(nextTimeFrame);
  };

  const feeRank = { title: "Rank", number: feeStats[selectedTimeFrame].rank, isCurrency: false };
  const feeAmount = { title: "Fees", number: feeStats[selectedTimeFrame].fees, isCurrency: true, percentage: feeStats[selectedTimeFrame].change };
  const feeShare = {
    title: "Market Share",
    number: (feeStats[selectedTimeFrame].percentage * 100).toFixed(2) + "%",
    isCurrency: false,
  };
  const RevenueAmount = {
    title: "Revenue (last 24h)",
    number: dataRevenue.total24h,
    isCurrency: true,
    percentage: dataRevenue.total24h.change_1d,
  };

  return (
    <Card className={styles.wrapper}>
      <TimeFrameSelectorCompact
        timeFrame={selectedTimeFrame}
        onSetTimeFrame={handleChangeTimeFrame}
        className={styles.timeFrame}
      />
      <h1 className={styles.header}>
        <img
          src={dataRevenue.logo}
          className={styles.logo}
        />
        {dataRevenue.displayName}
      </h1>

      <div className={styles["stats-container"]}>
        <Stat {...feeRank} />
        <Stat {...feeAmount} />
        <Stat {...feeShare} />
        <Stat {...RevenueAmount} />
      </div>
    </Card>
  );
};

export default ProtocolFeeStats;
