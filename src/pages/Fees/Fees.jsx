import FeesTable from "../../components/Table/FeesTable";
import styles from "./Fees.module.scss";
import { useQuery } from "react-query";
import { fetchData, unixToMs } from "../../utils/helpers";
import defillama from "defillama-api";
import FeeStats from "./FeeStats";
import FeesCategoryChart from "../../components/Chart/Fees/FeesCategoryChart";
import ChartContainer from "../../components/Chart/ChartContainer";
import LineChart from "../../components/Chart/LineChart";
import { useMemo } from "react";
import DataDistribution from "../../components/DataDistribution/DataDistribution";

const Fees = () => {
  const { data } = useQuery(["fees"], () =>
    fetchData(defillama.feesRevenue.all({ exludeTotalDataChart: false, exludeTotalDataChartBreakdown: false }))
  );

  const feeHistoryData = useMemo(() => {
    return data.totalDataChart.map(([time, val]) => {
      return { x: unixToMs(time), y: val };
    });
  }, [data]);

  return (
    <>
      <FeeStats data={data} />
      <ChartContainer>
        <LineChart
          data={feeHistoryData}
          className={styles["chart--full-width"]}
          title="Combined Fee History"
        />
        <FeesCategoryChart data={data} />
        <DataDistribution
          data={data}
          title={"Fee Distribution"}
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
  );
};

export default Fees;
