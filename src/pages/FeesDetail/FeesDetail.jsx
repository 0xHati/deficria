import styles from "./FeesDetail.module.scss";
import { useParams } from "react-router-dom";
import { FeeProtocolChart } from "../../components/Chart/Fees/FeeProtocolChart";
import { Suspense, useMemo } from "react";
import { useQuery } from "react-query";
import defillama from "defillama-api";

import FeeDetailStats from "./FeeDetailStats";

import { fetchData, unixToMs } from "../../utils/helpers";
import ChartContainer from "../../components/Chart/ChartContainer";
import StackedLineChart from "../../components/Chart/StackedLineChart";
import Loader from "../../components/Loader/Loader";

const FeesDetail = () => {
  const { protocol } = useParams();

  const { data: dataFees } = useQuery(["fees", protocol], () => fetchData(defillama.feesRevenue.protocol(protocol)));
  const { data: dataRevenue } = useQuery(["revenue", protocol], () =>
    fetchData(defillama.feesRevenue.protocol(protocol, { dataType: "dailyRevenue" }))
  );

  const distributionChartData = useMemo(() => {
    const transformedData = {};
    dataFees.totalDataChartBreakdown.forEach(([time, chains]) => {
      Object.entries(chains).forEach(([chain, value]) => {
        //sum over different versions on the chain (ex uni v1, uni v2)
        const sum = Object.values(value).reduce((acc, prev) => (acc += prev), 0);
        if (!transformedData[chain]) {
          transformedData[chain] = [[unixToMs(time), sum]];
        } else {
          transformedData[chain].push([unixToMs(time), sum]);
        }
      });
    });
    return transformedData;
  }, [dataFees]);

  return (
    <>
      <div className={styles.wrapper}>
        <FeeDetailStats
          dataRevenue={dataRevenue}
          protocol={protocol}
        />
        <ChartContainer>
          <FeeProtocolChart dataSets={{ fees: prepareData(dataFees), revenue: prepareData(dataRevenue) }} />
          <StackedLineChart
            data={distributionChartData}
            title={"Fee Distribution over time"}
          />
        </ChartContainer>
      </div>
    </>
  );
};

//sometimes there's no data so return empty array instead of 'undefined'
const prepareData = (data) => {
  return data.totalDataChart
    ? data.totalDataChart.map(([date, value]) => {
        return [date * 1000, value];
      })
    : [];
};

export default FeesDetail;
