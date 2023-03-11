import { Suspense, useMemo } from "react";
import { useQuery } from "react-query";
import Filter from "../../components/Filter";
import HistoricalChainTVL from "../../components/Chart/TVL/HistoricalChainTVL";
import TotalValueLockedTable from "../../components/Table/TotalValueLocked";
import Card from "../../components/Card";
import { fetchData } from "../../utils/helpers";
import defillama from "defillama-api";
import styles from "./TotalValueLocked.module.scss";
import TVLStats from "../../components/Stats/TVLStats";
import DistributionChart from "../../components/Chart/DistributionChart";
import ChartContainer from "../../components/Chart/ChartContainer";
import TVLCategoryChart from "../../components/Chart/TVL/TVLCategoryChart";

const TotalValueLocked = () => {
  const { data: dataTVL } = useQuery(["TVL"], () => fetchData(defillama.tvl.protocols()));
  const { data: dataTVLHistory } = useQuery(["TVL", "history"], () => fetchData(defillama.tvl.chainsHistorical()));

  const { data: dataTVLChains } = useQuery(["TVL", "chains"], () => fetchData(defillama.tvl.chains()));

  const TVLChainsTotal = dataTVLChains.reduce((acc, { tvl }) => {
    return (acc += tvl);
  }, 0);

  const totalTVL = useMemo(() => {
    return dataTVL.reduce((acc, { tvl }) => {
      acc += tvl;

      return acc;
    }, 0);
  });
  return (
    <>
      <Suspense fallback={<>Loading...</>}>
        <TVLStats
          totalTVL={totalTVL}
          history={dataTVLHistory}
          totalProtocols={dataTVL.length}
        />
        <ChartContainer>
          <TVLCategoryChart
            totalTVL={totalTVL}
            data={dataTVL}
          />
          <Card>
            <DistributionChart
              data={transformData(dataTVLChains, TVLChainsTotal)}
              title={"TVL Distribution (chains)"}
              threshold={0.01}
            />
          </Card>

          <HistoricalChainTVL data={dataTVLHistory} />
        </ChartContainer>
        <TotalValueLockedTable data={dataTVL} />
      </Suspense>
    </>
  );
};

const transformData = (dataTVLChains, totalTVL) => {
  console.log(totalTVL);
  return dataTVLChains.map(({ name, tvl }) => {
    console.log({ name, tvl });
    return { name: name, y: (tvl / totalTVL) * 100 };
  });
};

export default TotalValueLocked;
