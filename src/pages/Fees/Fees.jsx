import { useParams } from "react-router-dom";
import { FeesChart } from "../../components/Chart/FeesChart";
import styles from "./Fees.module.scss";
import { ProtocolFeeInfo } from "./ProtocolFeeInfo";
import { useFetcher } from "../../hooks/useFetcher";
import { FEEDATA_PROTOCOL } from "../../constants/api";
import { useEffect, Suspense } from "react";
import { useLocation } from "react-router-dom";

const Fees = () => {
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

  console.log(dataSets);
  return (
    <div className={styles.wrapper}>
      {!isLoading && !isError && <ProtocolFeeInfo data={dataFee}></ProtocolFeeInfo>}
      {!isLoading && !isError && <FeesChart dataSets={dataSets} />}
    </div>
  );
};

const prepareDataSets = (...data) => {
  const dataSets = [];
  data.forEach((item) => {
    const transformedData = item.data?.totalDataChart?.map(([date, value]) => [date * 1000, value]);
    console.log(transformedData);
    dataSets.push({ ...item, data: transformedData ? transformedData : [] });
  });
  return dataSets;
};

// {isLoading && <span>Loading...</span>}
// {isError && <span>{error.message}</span>}

// {!isLoading && !isError && (
//   <HighchartsReact
//     highcharts={Highcharts}
//     options={options}
//   />
// )}

export default Fees;
