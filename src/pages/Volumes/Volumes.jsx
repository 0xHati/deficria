import { DexTable } from "../../components/Table/DexTable";
import { useQuery } from "react-query";
import { fetchData } from "../../utils/helpers";
import defillama from "defillama-api";
import VolumesChart from "../../components/Chart/Volumes/VolumesChart";
import { Suspense } from "react";
import Card from "../../components/Card";
import styles from "./Volumes.module.scss";

const Volumes = () => {
  const { data } = useQuery(["dex", "chartData"], () =>
    fetchData(defillama.volumes.dexsAll({ exludeTotalDataChart: false, exludeTotalDataChartBreakdown: false }))
  );

  console.log(data);

  return (
    <Suspense fallback={<>Loading...</>}>
      <Card className={styles["chart-container"]}>
        <VolumesChart data={data.totalDataChart} />
      </Card>
      <DexTable data={data.protocols} />
    </Suspense>
  );
};

export default Volumes;
