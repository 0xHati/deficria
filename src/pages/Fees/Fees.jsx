import { FeesTable } from "../../components/Table/FeesTable";
import { TIMEFRAMES } from "../../constants/timeframes";
import { useState, Suspense, useEffect } from "react";
import { calculateFeeStats } from "../../utils/helpers";
import FeeDistribution from "../../components/FeeDistribution/FeeDistribution";
import { FEEDATA_PROTOCOL } from "../../constants/api";
import { useFees } from "../../hooks/useFees";
import styles from "./Fees.module.scss";
import FeeHistoryChart from "../../components/Chart/Fees/FeeHistoryChart";

const Fees = () => {
  const { data, isLoading, isError } = useFees();

  const feeStats = calculateFeeStats(data);

  return (
    <>
      {!isLoading && !isError && (
        <>
          <div className={styles.charts}>
            <FeeDistribution
              feeStats={feeStats}
              className={styles.feeDistribution}
            />
            <FeeHistoryChart data={data.totalDataChart} />
          </div>

          <FeesTable
            isSimplyfied={false}
            data={data.protocols}
            timeFrame={TIMEFRAMES.day}
            feeStats={feeStats}
          />
        </>
      )}
    </>
  );
};

export default Fees;
