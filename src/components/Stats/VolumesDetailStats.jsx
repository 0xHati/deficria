import Card from "../Card";
import SparklineStat from "./SparklineStat";
import styles from "./Stat.module.scss";
import { formatNumberToLocale, unixToMs, groupDatesByWeek } from "../../utils/helpers";
import Stat from "./Stat";
import { subMonths } from "date-fns";
import { TIMESPAN_SPARKLINE } from "../../constants/charts";
import { useMemo } from "react";

const VolumesDetailStats = ({ data }) => {
  const totalVolume = {
    title: "Total Volume",
    number: formatNumberToLocale(data.total24h),
    info: "vs 1d ago",
    percentage: data.change_1d,
  };

  const totalVolumeAllTime = {
    title: "Total Volume All Time",
    number: formatNumberToLocale(data.totalAllTime),
  };

  const chains = { title: "Chains", number: data.chains.length };
  useMemo(() => transformDataSparkline(data, TIMESPAN_SPARKLINE), [data]);

  return (
    <Card className={styles.wrapper}>
      <h1 className={styles.header}>
        <img
          src={data.logo}
          className={styles.logo}
        />
        {data.displayName}
      </h1>
      <div className={styles["stats-container"]}>
        <Stat {...chains} />

        <Stat {...totalVolume} />
        <Stat {...totalVolumeAllTime} />
        <SparklineStat data={data.sparkline} />
      </div>
    </Card>
  );
};

const transformDataSparkline = (data, timespan) => {
  const referenceTime = subMonths(new Date(), timespan);
  const filteredData = data.totalDataChart.map(([date, value]) => [unixToMs(date), value]).filter(([date, value]) => date > referenceTime);
  const groupedData = groupDatesByWeek(filteredData);

  data.sparkline = groupedData;
  console.log(data);
};

export default VolumesDetailStats;
