import { FeesTable } from "../../components/Table/FeesTable";
import FeeDistribution from "../../components/FeeDistribution/FeeDistribution";
import styles from "./Fees.module.scss";
import FeeHistoryChart from "../../components/Chart/Fees/FeeHistoryChart";
import { useQuery } from "react-query";
import { Suspense } from "react";
import { fetchFeeData } from "../../api/defillama";

const Fees = () => {
  const { data, isLoading, isError } = useQuery(["fees"], () => fetchFeeData(), { suspense: false });
  return (
    <>
      {!isLoading && !isError && (
        <>
          <div className={styles.charts}>
            <FeeDistribution
              feeData={data}
              className={styles.feeDistribution}
            />
            <FeeHistoryChart data={data.totalDataChart} />
          </div>
          <FeesTable
            isExpanded={false}
            data={data.protocols}
          />
        </>
      )}
    </>
  );
};

export default Fees;
