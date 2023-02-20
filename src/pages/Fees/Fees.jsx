import { useParams } from "react-router-dom";
import { FeesChart } from "../../components/Chart/FeesChart";

const Fees = () => {
  const { protocol } = useParams();
  console.log(protocol);
  return (
    <>
      <FeesChart protocol={protocol} />
      {protocol}
    </>
  );
};

export default Fees;
