import { useParams } from "react-router-dom";
import defillama from "defillama-api";
import { useQuery } from "react-query";
import { fetchData } from "../../utils/helpers";
import LineChart from "../../components/Chart/LineChart";
import CategoryChart from "../../components/Chart/CategoryChart";
import ChartContainer from "../../components/Chart/ChartContainer";

const TotalValueLockedDetail = () => {
  const { protocol } = useParams();
  const { data: dataProtocol } = useQuery(["fees", protocol], () => fetchData(defillama.tvl.protocol(protocol)));
  console.log(dataProtocol);

  return (
    <>
      <ChartContainer>
        <LineChart
          data={dataProtocol.tvl}
          title={"TVL over time"}
        />
        <CategoryChart
          data={dataProtocol.currentChainTvls}
          threshold={0.5}
        />
      </ChartContainer>
    </>
  );
};

export default TotalValueLockedDetail;
