import { useMemo } from "react";
import { useQuery } from "react-query";
import TotalValueLockedTable from "../../components/Table/TotalValueLocked";
import Card from "../../components/Card";
import { fetchData, unixToMs } from "../../utils/helpers";
import defillama from "defillama-api";
import styles from "./TotalValueLocked.module.scss";
import TVLStats from "./TVLStats";
import DistributionChart from "../../components/Chart/DistributionChart";
import ChartContainer from "../../components/Chart/ChartContainer";
import CategoryChart from "../../components/Chart/CategoryChart";
import LineChart from "../../components/Chart/LineChart";

const TotalValueLocked = () => {
  const { data: dataTVL } = useQuery(["TVL"], () => fetchData(defillama.tvl.protocols()));
  const { data: dataTVLHistory } = useQuery(["TVL", "history"], () => fetchData(defillama.tvl.chainsHistorical()));

  const { data: dataTVLChains } = useQuery(["TVL", "chains"], () => fetchData(defillama.tvl.chains()));

  const dataTVLCategory = useMemo(() => {
    let chartData = {};
    dataTVL.map(({ category, tvl }) => {
      if (!chartData[category]) {
        chartData[category] = tvl;
      } else {
        chartData[category] += tvl;
      }
      return chartData;
    });
    return chartData;
  }, [dataTVL]);

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
      <div className={styles.header}>
        <TVLStats
          totalTVL={totalTVL}
          history={dataTVLHistory}
          totalProtocols={dataTVL.length}
        />
      </div>
      <ChartContainer>
        <LineChart
          data={dataTVLHistory.map(({ date, tvl }) => {
            return { x: unixToMs(date), y: tvl };
          })}
          title={"TVL over time"}
          className={styles["chart--full-width"]}
        />
        <CategoryChart
          totalTVL={totalTVL}
          data={dataTVLCategory}
          threshold={1}
        />
        <Card>
          <DistributionChart
            data={transformData(dataTVLChains, TVLChainsTotal)}
            title={"TVL Distribution (chains)"}
            threshold={1}
          />
        </Card>
      </ChartContainer>
      <TotalValueLockedTable data={dataTVL} />
    </>
  );
};

const transformData = (dataTVLChains, totalTVL) => {
  return dataTVLChains.map(({ name, tvl }) => {
    return { name: name, y: (tvl / totalTVL) * 100 };
  });
};

export default TotalValueLocked;
