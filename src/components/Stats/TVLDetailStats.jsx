import Card from "../Card";
import styles from "./Stat.module.scss";
import Stat from "./Stat";
import { formatNumberToLocale } from "../../utils/helpers";

const TVL_TIMESPAN = 7; // compare current tvl with 7 days ago

const TVLDetailStats = ({ data }) => {
  const totalTVL = {
    title: "Total TVL",
    number: formatNumberToLocale(data.tvl.at(-1).totalLiquidityUSD),
    info: "vs 7d ago",
    percentage: (
      (data.tvl.at(-1).totalLiquidityUSD - data.tvl.at(-TVL_TIMESPAN).totalLiquidityUSD) /
      data.tvl.at(-TVL_TIMESPAN).totalLiquidityUSD
    ).toFixed(2),
  };

  const tokens = { title: "Tokens", number: Object.values(data.tokens.at(-1).tokens).length };

  return (
    <Card className={styles.wrapper}>
      <h1 className={styles.header}>
        <img
          src={data.logo}
          className={styles.logo}
        />
        {data.name}
      </h1>

      <div className={styles["stats-container"]}>
        {/* {/* <Stat {...feeRank} /> */}
        <Stat {...tokens} />

        <Stat {...totalTVL} />
      </div>
    </Card>
  );
};
export default TVLDetailStats;
