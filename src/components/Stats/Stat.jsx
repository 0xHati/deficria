import { formatNumberToLocale } from "../../utils/helpers";
import Card from "../Card";
import styles from "./Stat.module.scss";
import { FiArrowUpRight, FiArrowDownRight } from "react-icons/fi";
import { styleNumber } from "../../utils/helpers";

const Stat = ({ title, number, percentage, isCurrency = true }) => {
  const className = styleNumber(percentage);
  return (
    <div className={styles.stat}>
      <p className={styles.title}>{title}</p>
      <p>
        <span className={styles.number}>{isCurrency ? formatNumberToLocale(number, true) : number}</span>
        <span className={styles.percentage}>
          {percentage && percentage + "%"}
          {percentage && percentage > 0 ? <FiArrowUpRight className={className} /> : percentage && <FiArrowDownRight className={className} />}
        </span>
      </p>
    </div>
  );
};

export default Stat;
