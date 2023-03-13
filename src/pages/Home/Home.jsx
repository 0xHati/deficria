import { FeeLeaderBoard } from "../../components/FeeLeaderBoard";
import { Hero } from "../../components/Hero";

import TablesTab from "../../components/TablesTab";
import Loader from "../../components/Loader/Loader";

const Home = () => {
  return (
    <>
      <Hero />
      {<TablesTab />}
    </>
  );
};

export default Home;
