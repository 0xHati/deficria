import { Suspense, useMemo } from "react";
import { useQuery } from "react-query";
import Filter from "../../components/Filter";
import TotalValueLockedTable from "../../components/Table/TotalValueLocked";
import Card from "../../components/Card";
import { fetchData, unixToMs } from "../../utils/helpers";
import defillama from "defillama-api";
import styles from "./TotalValueLocked.module.scss";
import TVLStats from "../../components/Stats/TVLStats";
import DistributionChart from "../../components/Chart/DistributionChart";
import ChartContainer from "../../components/Chart/ChartContainer";
import CategoryChart from "../../components/Chart/CategoryChart";
import { Checkbox, CheckboxCheck, useCheckboxState } from "ariakit/checkbox";
import { VisuallyHidden } from "ariakit/visually-hidden";
import { useState } from "react";
import LineChart from "../../components/Chart/LineChart";

const TotalValueLocked = () => {
  const { data: dataTVL } = useQuery(["TVL"], () => fetchData(defillama.tvl.protocols()));
  const { data: dataTVLHistory } = useQuery(["TVL", "history"], () => fetchData(defillama.tvl.chainsHistorical()));

  const { data: dataTVLChains } = useQuery(["TVL", "chains"], () => fetchData(defillama.tvl.chains()));
  const checkbox = useCheckboxState(true);
  const [focusVisible, setFocusVisible] = useState(false);

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
      <Suspense fallback={<>Loading...</>}>
        <div className={styles.header}>
          <TVLStats
            totalTVL={totalTVL}
            history={dataTVLHistory}
            totalProtocols={dataTVL.length}
          />
          <div>
            <label className={styles.label}>
              <VisuallyHidden>
                <Checkbox
                  state={checkbox}
                  onFocusVisible={() => setFocusVisible(true)}
                  onBlur={() => setFocusVisible(false)}
                />
              </VisuallyHidden>
              <div
                className={styles.checkbox}
                data-focus-visible={focusVisible ? "" : null}>
                <CheckboxCheck checked={checkbox.value} />
              </div>
              Hide CEX
            </label>
          </div>
        </div>

        <ChartContainer>
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

          <LineChart
            data={dataTVLHistory.map(({ date, tvl }) => {
              return { x: unixToMs(date), y: tvl };
            })}
            title={"TVL history"}
          />
        </ChartContainer>
        <TotalValueLockedTable data={dataTVL} />
      </Suspense>
    </>
  );
};

const transformData = (dataTVLChains, totalTVL) => {
  return dataTVLChains.map(({ name, tvl }) => {
    return { name: name, y: (tvl / totalTVL) * 100 };
  });
};

export default TotalValueLocked;
