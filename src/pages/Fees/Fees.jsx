import { FeesTable } from "../../components/Table/FeesTable";
import { TIMEFRAMES } from "../../constants/timeframes";
import { useState, Suspense, useEffect } from "react";
import { calculateFeeStats } from "../../utils/helpers";
import FeeDistribution from "../../components/FeeDistribution/FeeDistribution";
import { FEEDATA_PROTOCOL } from "../../constants/api";
import { useFees } from "../../hooks/useFees";

const Fees = () => {
  const { data, isLoading, isError } = useFees();

  const feeStats = calculateFeeStats(data);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      {!isLoading && !isError && (
        <>
          <FeeDistribution feeStats={feeStats} />
          <FeesTable
            isSimplyfied={false}
            data={data.protocols}
            timeFrame={TIMEFRAMES.day}
            feeStats={feeStats}
          />
        </>
      )}
    </Suspense>
  );
};

export default Fees;
