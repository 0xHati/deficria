import Card from "../Card";
import styles from "./Stat.module.scss";
import Stat from "./Stat";
import { useMemo } from "react";
import Sparkline from "../Chart/Fees/Sparkline";
import { subMonths } from "date-fns";
import { unixToMs, formatNumberToLocale, groupDatesByWeek } from "../../utils/helpers";
import { IoClipboardSharp } from "react-icons/io5";
import { TIMESPAN_SPARKLINE } from "../../constants/charts";
import SparklineStat from "./SparklineStat";

const TVL_TIMESPAN = 7; // compare current tvl with 7 days ago

const TVLDetailStats = ({ data }) => {
  const totalTVL = {
    title: "Total TVL",
    number: formatNumberToLocale(data.tvl.at(-1).totalLiquidityUSD),
    info: "vs 7d ago",
    percentage: (
      (data.tvl.at(-1).totalLiquidityUSD - data.tvl.at(-TVL_TIMESPAN).totalLiquidityUSD) /
      data.tvl.at(-TVL_TIMESPAN).totalLiquidityUSD
    ).toFixed(2),
  };

  const tokens = { title: "Tokens", number: Object.values(data.tokens.at(-1).tokens).length };

  useMemo(() => transformDataSparkline(data, TIMESPAN_SPARKLINE), [data]);

  return (
    <Card className={styles.wrapper}>
      <h1 className={styles.header}>
        <img
          src={data.logo}
          className={styles.logo}
        />
        {data.name}
      </h1>

      <div className={styles["stats-container"]}>
        {/* {/* <Stat {...feeRank} /> */}
        <Stat {...tokens} />

        <Stat {...totalTVL} />
        <SparklineStat data={data.sparkline} />
      </div>
    </Card>
  );
};

const transformDataSparkline = (data, timespan) => {
  const referenceTime = subMonths(new Date(), timespan);
  const filteredData = data.tvl
    .map(({ date, totalLiquidityUSD }) => [unixToMs(date), totalLiquidityUSD])
    .filter(([time, value]) => time > referenceTime);
  const groupedData = groupDatesByWeek(filteredData);
  data.sparkline = groupedData;
};

export default TVLDetailStats;
