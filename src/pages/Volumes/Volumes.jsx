import DexTable from "../../components/Table/DexTable";
import { useQuery } from "react-query";
import { fetchData, unixToMs } from "../../utils/helpers";
import defillama from "defillama-api";
import ChartContainer from "../../components/Chart/ChartContainer";
import LineChart from "../../components/Chart/LineChart";
import DataDistribution from "../../components/DataDistribution/DataDistribution";
import VolumesStats from "./VolumesStats";
import styles from "./Volumes.module.scss";

const Volumes = () => {
  const { data } = useQuery(["dex", "chartData"], () =>
    fetchData(defillama.volumes.dexsAll({ exludeTotalDataChart: false, exludeTotalDataChartBreakdown: false }))
  );

  const transformedData = data.totalDataChart.map(([date, volume]) => {
    return { x: unixToMs(date), y: volume };
  });

  return (
    <>
      <VolumesStats data={data} />
      <ChartContainer>
        <LineChart
          data={transformedData}
          title={"Dex Volumes over time"}
          className={styles["chart--full-width"]}
        />
        <DataDistribution
          data={data}
          title={"Volume Distribution"}
          className={styles["chart--full-width"]}
        />
      </ChartContainer>

      <DexTable data={data.protocols} />
    </>
  );
};

export default Volumes;
