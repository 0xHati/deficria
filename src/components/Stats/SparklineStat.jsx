import Sparkline from "../Chart/Fees/Sparkline";
import styles from "./Stat.module.scss";

const SparklineStat = ({ data }) => {
  return (
    <div className={styles.stat}>
      <p className={styles.title}>
        Trend <span className={styles.info}>(last 3 months)</span>
      </p>
      <Sparkline
        data={data}
        margin={{ marginRight: "auto" }}
      />
    </div>
  );
};

export default SparklineStat;
