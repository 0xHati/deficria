import Card from "../Card";
import Stat from "./Stat";
import styles from "./Stat.module.scss";
import { formatNumberToLocale, unixToMs, groupDatesByWeek } from "../../utils/helpers";
import { useMemo } from "react";
import subMonths from "date-fns/subMonths";
import Sparkline from "../Chart/Fees/Sparkline";

const TIMESPAN_SPARKLINE = 3;
const TVL_TIMESPAN = 7; // compare current tvl with 7 days ago

const TVLStats = ({ protocols, history }) => {
  const numberProtocols = { title: "Number of protocols", number: protocols.length };
  const currentTVL = {
    title: "Current TVL",
    number: formatNumberToLocale(history.at(-1).tvl),
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
      <div className={styles.stat}>
        <p className={styles.title}>Trend (last 3 months)</p>
        <Sparkline
          data={sparklineData}
          margin={{ marginRight: "auto" }}
        />
      </div>
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
