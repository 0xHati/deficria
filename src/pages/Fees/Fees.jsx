import { FeesTable } from "../../components/Table/FeesTable";
import { TIMEFRAMES } from "../../constants/timeframes";
import { useFees } from "../../hooks/useFees";
import { useState } from "react";
import { calculateFeeStats } from "../../utils/helpers";
import FeeDistribution from "../../components/FeeDistribution/FeeDistribution";

const Fees = () => {
  const { data } = useFees();
  const [feeStats, setFeeStats] = useState(calculateFeeStats(data));

  return (
    <>
      <FeeDistribution feeStats={feeStats} />
      <FeesTable
        isSimplyfied={false}
        data={data.protocols}
        timeFrame={TIMEFRAMES.day}
        feeStats={feeStats}
      />
    </>
  );
};

export default Fees;
