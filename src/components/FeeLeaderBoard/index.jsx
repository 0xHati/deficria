import { FEEDATA } from "../../constants/api";
import { FeesTable } from "../Table/FeesTable";
import { useFetcher } from "../../hooks/useFetcher";
import styles from "./FeeLeaderBoard.module.css";

export const FeeLeaderBoard = () => {
  const { isLoading, isError, data, error } = useFetcher(FEEDATA);

  return (
    <div className={styles["leaderboard-fees-container"]}>
      <h2>Leaderboard Fees</h2>
      {isLoading && <span>Loading...</span>}
      {!isLoading && !isError && <FeesTable data={data.protocols} showFees={"total30d"} isExpanded={false} />}
    </div>
  );
};
