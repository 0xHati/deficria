import { calculateStats } from "../../utils/helpers";
import { fetchData, getNextTimeFrame, slug, formatNumberToLocale } from "../../utils/helpers";
import { useQuery } from "react-query";
import defillama from "defillama-api";
import Card from "../../components/Card";
import styles from "../../components/Stats/Stat.module.scss";
import Stat from "../../components/Stats/Stat";
import { TimeFrameSelectorCompact } from "../../components/TimeFrameSelector/TimeFrameSelector";
import { TIMEFRAMES_LIMITED } from "../../constants/timeframes";

import { useState } from "react";

const FeeDetailStats = ({ dataRevenue, protocol }) => {
  const [selectedTimeFrame, setSelectedTimeFrame] = useState("total24h");
  const { data: feeData } = useQuery(["fees", "nochart"], () => fetchData(defillama.feesRevenue.all()));

  const { data: priceData } = useQuery(
    ["price", protocol],
    () => fetchData(defillama.coins.pricesCurrent([{ coingecko: dataRevenue.gecko_id }])),
    !!dataRevenue.gecko_id
  );

  const feeStats = calculateStats(feeData).find((item) => slug(item.name) === slug(protocol));

  const handleChangeTimeFrame = (timeFrame) => {
    const nextTimeFrame = getNextTimeFrame(TIMEFRAMES_LIMITED, timeFrame);
    setSelectedTimeFrame(nextTimeFrame);
  };

  const coinPrice = Object.values(priceData.coins)[0]?.price;
  const coinSymbol = Object.values(priceData.coins)[0]?.symbol;

  const feeRank = { title: "Rank", number: feeStats[selectedTimeFrame].rank };
  const feeAmount = {
    title: "Fees",
    number: `${formatNumberToLocale(feeStats[selectedTimeFrame].total, true)}${
      coinPrice ? ` or ${formatNumberToLocale(feeStats[selectedTimeFrame].total / coinPrice, true, false)} ${coinSymbol}` : ``
    }`,
    percentage: feeStats[selectedTimeFrame].change,
  };
  const feeShare = {
    title: "Market Share",
    number: (feeStats[selectedTimeFrame].percentage * 100).toFixed(2) + "%",
    isCurrency: false,
  };
  const RevenueAmount = {
    title: "Revenue (last 24h)",
    number: formatNumberToLocale(dataRevenue.total24h, true),
    isCurrency: true,
    percentage: dataRevenue.change_1d,
  };

  const RevenueAnnualized = {
    title: "Revenue annualized",
    number: `${formatNumberToLocale(dataRevenue.total24h * 365, true)}${
      coinPrice ? ` or ${formatNumberToLocale((dataRevenue.total24h * 365) / coinPrice, true, false)} ${coinSymbol}` : ` `
    }`,

    isCurrency: true,
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
        {dataRevenue.total24h > 0 && <Stat {...RevenueAmount} />}
        {dataRevenue.total24h > 0 && <Stat {...RevenueAnnualized} />}
      </div>
    </Card>
  );
};

export default FeeDetailStats;
