import Card from "../Card";
import Stat from "./Stat";
import styles from "./Stat.module.scss";
import { formatNumberToLocale, unixToMs, groupDatesByWeek } from "../../utils/helpers";
import { useMemo } from "react";
import subMonths from "date-fns/subMonths";
import SparklineStat from "./SparklineStat";

const TIMESPAN_SPARKLINE = 3;
const TVL_TIMESPAN = 7; // compare current tvl with 7 days ago

const TVLStats = ({ totalTVL, history, totalProtocols }) => {
  const numberProtocols = { title: "Number of protocols", number: totalProtocols };

  const currentTVL = {
    title: "Current TVL",
    number: formatNumberToLocale(totalTVL),
    percentage: ((history.at(-1).tvl - history.at(-TVL_TIMESPAN).tvl) / history.at(-TVL_TIMESPAN).tvl).toFixed(2),
    info: `(vs 7d ago)`,
  };

  const sparklineData = useMemo(() => {
    return transformDataSparkline(history, TIMESPAN_SPARKLINE);
  }, [history]);

  return (
    <Card className={styles["stats-container"]}>
      <Stat {...numberProtocols} />

      <Stat {...currentTVL} />
      <SparklineStat data={sparklineData} />
    </Card>
  );
};

const transformDataSparkline = (data, timespan) => {
  const referenceTime = subMonths(new Date(), timespan);
  const filteredData = data.filter(({ date }) => unixToMs(date) > referenceTime).map(({ date, tvl }) => [unixToMs(date), tvl]);

  const groupedData = groupDatesByWeek(filteredData);

  return groupedData;
};

export default TVLStats;
