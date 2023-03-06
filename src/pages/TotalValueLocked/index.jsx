import { Suspense } from "react";
import { useQuery } from "react-query";
import Filter from "../../components/Filter";
import HistoricalChainTVL from "../../components/Chart/TVL/HistoricalChainTVL";
import { TotalValueLockedTable } from "../../components/Table/TotalValueLocked";
import Card from "../../components/Card";
import { fetchData } from "../../utils/helpers";
import defillama from "defillama-api";

const TotalValueLocked = () => {
  const { data: dataTVL } = useQuery(["TVL"], () => fetchData(defillama.tvl.protocols()));
  const { data: dataTVLHistory } = useQuery(["TVL", "history"], () => fetchData(defillama.tvl.chainsHistorical()));

  return (
    <>
      <Suspense fallback={<>Loading...</>}>
        <Card>
          <HistoricalChainTVL data={dataTVLHistory} />
        </Card>
        <TotalValueLockedTable data={dataTVL} />
      </Suspense>
    </>
  );
};

export default TotalValueLocked;
