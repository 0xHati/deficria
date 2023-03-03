import { Suspense } from "react";
import { useQuery } from "react-query";
import { fetchTVL, fetchTVLHistory } from "../../api/defillama";
import Filter from "../../components/Filter";
import HistoricalChainTVL from "../../components/Chart/TVL/HistoricalChainTVL";
import { TotalValueLockedTable } from "../../components/Table/TotalValueLocked";
import Card from "../../components/Card";

const TotalValueLocked = () => {
  const { data: dataTVL } = useQuery(["TVL"], () => fetchTVL());
  const { data: dataTVLHistory } = useQuery(["TVL", "history"], () => fetchTVLHistory());

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
