import { DexTable } from "../../components/Table/DexTable";
import { useQuery } from "react-query";
import { fetchDexVolume } from "../../api/defillama";

const Volumes = () => {
  const { data } = useQuery(["dex"], () => fetchDexVolume());

  return <DexTable data={data.protocols} />;
};

export default Volumes;
