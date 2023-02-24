import styles from "./FeesDetail.module.scss";
import { ProtocolFeeInfo } from "./ProtocolFeeInfo";
import { useFetcher } from "../../hooks/useFetcher";
import { FEEDATA_PROTOCOL } from "../../constants/api";
import { useLocation } from "react-router-dom";
import { FeeProtocolChart } from "../../components/Chart/Fees/FeeProtocolChart";

//TODO: add info about average fees, highest fee date, change starting date to 2019
const FeesDetail = () => {
  const { state } = useLocation();
  const { protocol, feeStats } = state;

  const feeQuery = {
    key: FEEDATA_PROTOCOL.key + protocol + "fees",
    url: FEEDATA_PROTOCOL.endpoint,
    path: protocol,
    params: {
      dataType: "dailyFees",
    },
  };
  const revenueQuery = {
    key: FEEDATA_PROTOCOL.key + protocol + "rev",
    url: FEEDATA_PROTOCOL.endpoint,
    path: protocol,
    params: {
      dataType: "dailyRevenue",
    },
  };

  const { isLoading: isLoadingFee, isError: isErrorFee, data: dataFee, error: errorFee } = useFetcher(feeQuery);
  const { isLoading: isLoadingRev, isError: isErrorRev, data: dataRev, error: errorRev } = useFetcher(revenueQuery);
  // datasets[{name: data}]
  const isLoading = isLoadingFee || isLoadingRev;
  const isError = isErrorFee || isErrorRev;

  const dataSets = prepareDataSets({ name: "fees", data: dataFee }, { name: "revenue", data: dataRev });

  return (
    <div className={styles.wrapper}>
      {!isLoading && !isError && (
        <ProtocolFeeInfo
          data={dataFee}
          feeStats={feeStats}></ProtocolFeeInfo>
      )}
      {!isLoading && !isError && <FeeProtocolChart dataSets={dataSets} />}
    </div>
  );
};

const prepareDataSets = (...data) => {
  const dataSets = [];
  data.forEach((item) => {
    const transformedData = item.data?.totalDataChart?.map(([date, value]) => [date * 1000, value]);
    dataSets.push({ ...item, data: transformedData ? transformedData : [] });
  });
  return dataSets;
};

export default FeesDetail;
