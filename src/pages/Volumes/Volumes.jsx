import { DexTable } from "../../components/Table/DexTable";
import { useQuery } from "react-query";
import { fetchData } from "../../utils/helpers";
import defillama from "defillama-api";

const Volumes = () => {
  const { data } = useQuery(["dex"], () => fetchData(defillama.volumes.dexsAll()));

  return <DexTable data={data.protocols} />;
};

export default Volumes;
