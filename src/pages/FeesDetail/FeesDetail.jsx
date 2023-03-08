import styles from "./FeesDetail.module.scss";
import { useParams } from "react-router-dom";
import { FeeProtocolChart } from "../../components/Chart/Fees/FeeProtocolChart";
import { Suspense } from "react";
import { useQuery } from "react-query";
import defillama from "defillama-api";

import ProtocolFeeStats from "../../components/Stats/ProtocolFeeStats";

import { fetchData } from "../../utils/helpers";
import { ProtocolFeeInfo } from "./ProtocolFeeInfo";

//TODO: add info about average fees, highest fee date, change starting date to 2019, show total revenue
const FeesDetail = () => {
  const { protocol } = useParams();

  const { data: dataFees } = useQuery(["fees", protocol], () => fetchData(defillama.feesRevenue.protocol(protocol)));
  const { data: dataRevenue } = useQuery(["revenue", protocol], () =>
    fetchData(defillama.feesRevenue.protocol(protocol, { dataType: "dailyRevenue" }))
  );

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className={styles.wrapper}>
        <ProtocolFeeInfo
          data={dataFees}
          protocol={protocol}></ProtocolFeeInfo>
        <FeeProtocolChart dataSets={{ fees: prepareData(dataFees), revenue: prepareData(dataRevenue) }} />
      </div>
    </Suspense>
  );
};

//sometimes there's no data so return empty array instead of 'undefined'
const prepareData = (data) => {
  return data.totalDataChart
    ? data.totalDataChart.map(([date, value]) => {
        return [date * 1000, value];
      })
    : [];
};

export default FeesDetail;
