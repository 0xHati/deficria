import { useParams } from "react-router-dom";
import defillama from "defillama-api";
import { useQuery } from "react-query";
import { fetchData, unixToMs } from "../../utils/helpers";
import { Suspense, useMemo } from "react";
import VolumesDetailStats from "./VolumesDetailStats";
import ChartContainer from "../../components/Chart/ChartContainer";
import LineChart from "../../components/Chart/LineChart";
import StackedLineChart from "../../components/Chart/StackedLineChart";
import styles from "./VolumesDetail.module.scss";

const VolumesDetail = () => {
  const { protocol } = useParams();

  const { data: dataProtocol } = useQuery(["volume", protocol], () => fetchData(defillama.volumes.dexsProtocol(protocol)));

  const volumeHistory = useMemo(() => {
    return dataProtocol.totalDataChart.map(([time, value]) => {
      return {
        x: unixToMs(time),
        y: value,
      };
    });
  });

  const distributionChartData = useMemo(() => {
    const transformedData = {};
    dataProtocol.totalDataChartBreakdown.forEach(([time, chains]) => {
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
  }, [dataProtocol]);

  return (
    <>
      <VolumesDetailStats data={dataProtocol} />
      <ChartContainer>
        <LineChart
          data={volumeHistory}
          title={"Volume History"}
          className={styles["chart--full-width"]}
        />
        <StackedLineChart
          data={distributionChartData}
          title={"Volume per Chain"}
          className={styles["chart--full-width"]}
        />
      </ChartContainer>
    </>
  );
};

export default VolumesDetail;
