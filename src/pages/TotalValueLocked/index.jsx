import { Suspense } from "react";
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

  return (
    <>
      <Suspense fallback={<>Loading...</>}>
        <TVLStats
          protocols={dataTVL}
          history={dataTVLHistory}
        />
        <ChartContainer>
          <TVLCategoryChart data={dataTVL} />
          <Card>
            <DistributionChart
              data={transformData(dataTVLChains)}
              title={"TVL Distribution"}
            />
          </Card>

          <HistoricalChainTVL data={dataTVLHistory} />
        </ChartContainer>
        <TotalValueLockedTable data={dataTVL} />
      </Suspense>
    </>
  );
};

const transformData = (dataTVLChains) => {
  return dataTVLChains.map(({ name, tvl }) => {
    return { name: name, y: tvl };
  });
};

export default TotalValueLocked;
