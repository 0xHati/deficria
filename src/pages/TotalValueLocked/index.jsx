import { Suspense } from "react";
import { useQuery } from "react-query";
import { fetchTVL } from "../../api/defillama";
import Filter from "../../components/Filter";
import { TotalValueLockedTable } from "../../components/Table/TotalValueLocked";

const TotalValueLocked = () => {
  const { data } = useQuery(["TVL"], () => fetchTVL());

  return (
    <>
      <Suspense fallback={<>Loading...</>}>
        <TotalValueLockedTable data={data} />
      </Suspense>
    </>
  );
};

export default TotalValueLocked;
