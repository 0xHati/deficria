import Card from "../../components/Card";
import styles from "./Fees.module.scss";
import { formatNumberToLocale, styleNumber } from "../../utils/helpers";

//idea show rank on list
export const ProtocolFeeInfo = ({ data }) => {
  return (
    <Card className={styles["fee-info"]}>
      <h1 className={styles["fee-info__title"]}>
        <img
          src={data.logo}
          className={styles.logo}
        />

        <span className={styles["fee-info__name"]}>{data.displayName}</span>
      </h1>
      <p className={styles["fee-info__stat"]}>
        <span className={styles["helper"]}>Fees (24h)</span>
        <span className={styles.stat}>{formatNumberToLocale(data.total24h)}</span>
      </p>
      <p className={styles["fee-info__stat"]}>
        <span className={styles["helper"]}>1d change</span>
        <span className={`${styles.stat} ${styleNumber(data.change_1d)}`}>{data.change_1d}%</span>
      </p>
    </Card>
  );
};
