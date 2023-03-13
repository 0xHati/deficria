import DexTable from "../../components/Table/DexTable";
import { useQuery } from "react-query";
import { fetchData, unixToMs } from "../../utils/helpers";
import defillama from "defillama-api";
import { Suspense } from "react";
import ChartContainer from "../../components/Chart/ChartContainer";
import LineChart from "../../components/Chart/LineChart";

const Volumes = () => {
  const { data } = useQuery(["dex", "chartData"], () =>
    fetchData(defillama.volumes.dexsAll({ exludeTotalDataChart: false, exludeTotalDataChartBreakdown: false }))
  );

  const transformedData = data.totalDataChart.map(([date, volume]) => {
    return { x: unixToMs(date), y: volume };
  });

  return (
    <Suspense fallback={<>Loading...</>}>
      <ChartContainer>
        <LineChart
          data={transformedData}
          title={"Dex Volumes History"}
        />
      </ChartContainer>

      <DexTable data={data.protocols} />
    </Suspense>
  );
};

export default Volumes;
