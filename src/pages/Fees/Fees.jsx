import { FeesTable } from "../../components/Table/FeesTable";
import FeeDistribution from "../../components/FeeDistribution/FeeDistribution";
import styles from "./Fees.module.scss";
import FeeHistoryChart from "../../components/Chart/Fees/FeeHistoryChart";
import { useQuery } from "react-query";
import { fetchFeeData } from "../../api/defillama";
import Card from "../../components/Card";

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
            <Card className={styles.feeHistory}>
              <FeeHistoryChart data={data.totalDataChart} />
            </Card>
          </div>

          <FeesTable
            isExpanded={true}
            data={data.protocols}
          />
        </>
      )}
    </>
  );
};

export default Fees;
