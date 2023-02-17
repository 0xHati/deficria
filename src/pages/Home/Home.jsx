import { useFetcher } from "../../hooks/useFetcher";
import { DEXDATA } from "../../constants/api";
import { DexTable } from "../../components/Table/DexTable";
import { FeeLeaderBoard } from "../../components/FeeLeaderBoard";

const Home = () => {
  return (
    <>
      <FeeLeaderBoard />
    </>
  );
};

export default Home;
