import { lazy, Suspense } from "react";
// const FeesTable = lazy(() => import("../../components/Table/FeesTable/index"));

import FeesTable from "../../components/Table/FeesTable";
import FeeDistribution from "../../components/FeeDistribution/FeeDistribution";
import styles from "./Fees.module.scss";
import { useQuery } from "react-query";
import { fetchData, unixToMs } from "../../utils/helpers";
import defillama from "defillama-api";
import FeeStats from "../../components/Stats/FeeStats";
import FeesCategoryChart from "../../components/Chart/Fees/FeesCategoryChart";
import FeeDistributionChartHistory from "../../components/Chart/Fees/FeeDistributionChartHistory";
import ChartContainer from "../../components/Chart/ChartContainer";
import LineChart from "../../components/Chart/LineChart";
import { useMemo } from "react";

const Fees = () => {
  const { data } = useQuery(["fees"], () =>
    fetchData(defillama.feesRevenue.all({ exludeTotalDataChart: false, exludeTotalDataChartBreakdown: false }))
  );

  const feeHistoryData = useMemo(() => {
    return data.totalDataChart.map(([time, val]) => {
      return { x: unixToMs(time), y: val };
    });
  }, [data]);

  console.log(feeHistoryData);

  return (
    <Suspense fallback={<>Loading...</>}>
      <FeeStats data={data} />
      <ChartContainer>
        <FeesCategoryChart
          data={data}
          className={styles.chart}
        />
        <FeeDistribution
          feeData={data}
          className={styles.chart}
        />

        <LineChart
          data={feeHistoryData}
          className={styles.chart}
          title="Combined Fee History"
        />

        {/* <FeeDistributionChartHistory
              data={data.totalDataChartBreakdown}
              className={styles.chart}
            /> */}
      </ChartContainer>
      <FeesTable
        isExpanded={true}
        data={data.protocols}
      />
    </Suspense>
  );
};

export default Fees;
