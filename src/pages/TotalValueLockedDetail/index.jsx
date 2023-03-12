import { useParams } from "react-router-dom";
import defillama from "defillama-api";
import { useQuery } from "react-query";
import { fetchData, unixToMs } from "../../utils/helpers";
import LineChart from "../../components/Chart/LineChart";
import CategoryChart from "../../components/Chart/CategoryChart";
import ChartContainer from "../../components/Chart/ChartContainer";
import { useMemo } from "react";
import StackedLineChart from "../../components/Chart/StackedLineChart";

const TotalValueLockedDetail = () => {
  const { protocol } = useParams();
  const { data: dataProtocol } = useQuery(["fees", protocol], () => fetchData(defillama.tvl.protocol(protocol)));

  const distributionChartData = useMemo(() => {
    const transformedData = {};
    Object.entries(dataProtocol.chainTvls).forEach(([chain, { tvl }]) => {
      tvl.forEach(({ date, totalLiquidityUSD }) => {
        if (!transformedData[chain]) {
          transformedData[chain] = [[unixToMs(date), totalLiquidityUSD]];
        } else {
          transformedData[chain].push([unixToMs(date), totalLiquidityUSD]);
        }
      });
    });
    return transformedData;
  }, [dataProtocol]);

  return (
    <>
      <ChartContainer>
        <LineChart
          data={dataProtocol.tvl}
          title={"TVL over time"}
        />
        <CategoryChart
          data={dataProtocol.currentChainTvls}
          threshold={0.5}
        />
        <StackedLineChart
          data={distributionChartData}
          title={"TVL per Chain"}
        />
      </ChartContainer>
    </>
  );
};

export default TotalValueLockedDetail;
