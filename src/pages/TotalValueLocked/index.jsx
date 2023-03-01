import { Suspense } from "react";
import { useQuery } from "react-query";
import { fetchTVL } from "../../api/defillama";
import Filter from "../../components/Filter";
import { TotalValueLockedTable } from "../../components/Table/TotalValueLocked";

const TotalValueLocked = () => {
  const { data } = useQuery(["TVL"], () => fetchTVL());

  //easier to filter, get unique values, etc with strings than with arrays in react-table
  data.forEach((item, index) => (data[index].chains = data[index].chains.toString()));

  return (
    <>
      <Suspense fallback={<>Loading...</>}>
        <TotalValueLockedTable data={data} />
      </Suspense>
    </>
  );
};

export default TotalValueLocked;
