import { lazy, Suspense } from "react";
// const FeesTable = lazy(() => import("../../components/Table/FeesTable/index"));

import FeesTable from "../../components/Table/FeesTable";
import FeeDistribution from "../../components/FeeDistribution/FeeDistribution";
import styles from "./Fees.module.scss";
import FeeHistoryChart from "../../components/Chart/Fees/FeeHistoryChart";
import { useQuery } from "react-query";
import { fetchData } from "../../utils/helpers";
import defillama from "defillama-api";
import FeeStats from "../../components/Stats/FeeStats";
import FeesCategoryChart from "../../components/Chart/Fees/FeesCategoryChart";
import FeeDistributionChartHistory from "../../components/Chart/Fees/FeeDistributionChartHistory";
import ChartContainer from "../../components/Chart/ChartContainer";

const Fees = () => {
  const { data, isLoading, isError } = useQuery(
    ["fees"],
    () => fetchData(defillama.feesRevenue.all({ exludeTotalDataChart: false, exludeTotalDataChartBreakdown: false })),
    { suspense: false }
  );

  return (
    <>
      {!isLoading && !isError && (
        <>
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

            <FeeHistoryChart
              data={data.totalDataChart}
              className={styles.chart}
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
        </>
      )}
    </>
  );
};

export default Fees;
