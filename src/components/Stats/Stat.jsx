import { formatNumberToLocale } from "../../utils/helpers";
import styles from "./Stat.module.scss";
import { FiArrowUpRight, FiArrowDownRight } from "react-icons/fi";
import { styleNumber } from "../../utils/helpers";

const Stat = ({ title, number, percentage, info }) => {
  const className = styleNumber(percentage);

  let logo;
  if (percentage > 0) logo = <FiArrowUpRight className={className} />;
  if (percentage < 0) logo = <FiArrowDownRight className={className} />;
  if (percentage == 0) logo = "";
  return (
    <div className={styles.stat}>
      <div className={styles.title}>
        <span>{title}</span>
        <span className={styles.info}> {info}</span>
      </div>
      <div className={styles["number-container"]}>
        <span className={styles.number}>{number}</span>
        <span className={styles.percentage}>
          {percentage && percentage + "%"}
          {logo}
        </span>
      </div>
    </div>
  );
};

export default Stat;
