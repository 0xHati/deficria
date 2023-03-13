import Card from "../../components/Card";
import styles from "../../components/Stats/Stat.module.scss";
import Stat from "../../components/Stats/Stat";
import { useMemo } from "react";
import { subMonths } from "date-fns";
import { unixToMs, formatNumberToLocale, groupDatesByWeek } from "../../utils/helpers";
import { TIMESPAN_SPARKLINE } from "../../constants/charts";
import SparklineStat from "../../components/Stats/SparklineStat";

const VolumesStats = ({ data }) => {
  console.log(data);

  const protocols = { title: "Protocols", number: data.protocols.length };
  const volume = { title: "Volume (last 24h)", number: formatNumberToLocale(data.total24h), percentage: data.change_1d };

  useMemo(() => transformDataSparkline(data, TIMESPAN_SPARKLINE), [data]);

  return (
    <Card className={styles.wrapper}>
      <div className={styles["stats-container"]}>
        {/* {/* <Stat {...feeRank} /> */}
        <Stat {...protocols} />
        <Stat {...volume} />
        <SparklineStat data={data.sparkline} />
      </div>
    </Card>
  );
};

const transformDataSparkline = (data, timespan) => {
  const referenceTime = subMonths(new Date(), timespan);
  const filteredData = data.totalDataChart.map(([time, value]) => [unixToMs(time), value]).filter(([time, value]) => time > referenceTime);
  const groupedData = groupDatesByWeek(filteredData);

  data.sparkline = groupedData;
};

export default VolumesStats;
