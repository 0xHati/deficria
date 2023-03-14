import Card from "../../components/Card";
import SparklineStat from "../../components/Stats/SparklineStat";
import styles from "../../components/Stats/Stat.module.scss";
import { formatNumberToLocale, unixToMs, groupDatesByWeek } from "../../utils/helpers";
import Stat from "../../components/Stats/Stat";
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
    number: data.totalAllTime && formatNumberToLocale(data.totalAllTime),
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
      <div
        className={styles["stats-container"]}
        style={{ marginBottom: 0 }}>
        <Stat {...chains} />

        <Stat {...totalVolume} />
        {data?.totalAllTime && <Stat {...totalVolumeAllTime} />}
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
};

export default VolumesDetailStats;
