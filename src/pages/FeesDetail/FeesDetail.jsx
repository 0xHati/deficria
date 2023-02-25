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

  //TODO: refactor
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
  const isLoading = isLoadingFee || isLoadingRev;
  const isError = isErrorFee || isErrorRev;
  const dataSets = prepareDataSets({ fees: dataFee, revenue: dataRev });

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

// adjust to js timestamp
const prepareDataSets = (data) => {
  Object.entries(data).forEach(([key, value]) => {
    data[key] = data[key] === undefined ? [] : value.totalDataChart?.map(([date, value]) => [date * 1000, value]);
  });
  return data;
};

export default FeesDetail;
