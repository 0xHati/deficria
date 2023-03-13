import { unixToMs, formatNumberToLocale, groupDatesByWeek } from "../../utils/helpers";

import Stat from "../../components/Stats/Stat";
import styles from "../../components/Stats/Stat.module.scss";
import Card from "../../components/Card";
import { useMemo } from "react";
import Sparkline from "../../components/Chart/Fees/Sparkline";
import { subMonths } from "date-fns";

const TIMESPAN_SPARKLINE = 3;

const FeeStats = ({ data }) => {
  const feeDay = { title: "Fees (last 24h)", number: formatNumberToLocale(data.total24h), percentage: data.change_1d };

  const revenueDay = { title: "Revenue (last 24h)", number: formatNumberToLocale(data.dailyRevenue) };
  const numberProtocols = { title: "Number of protocols", number: data.protocols.length };

  useMemo(() => transformDataSparkline(data, TIMESPAN_SPARKLINE), [data]);

  return (
    <Card className={styles["stats-container"]}>
      <Stat
        {...numberProtocols}
        isCurrency={false}
      />
      <Stat {...feeDay} />
      <Stat {...revenueDay} />
      <div className={styles.stat}>
        <p className={styles.title}>Trend (last 3 months)</p>
        <Sparkline
          data={data.sparkline}
          margin={{ marginRight: "auto" }}
        />
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

export default FeeStats;
