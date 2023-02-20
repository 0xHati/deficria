import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import { useFetcher } from "../../../hooks/useFetcher";
import { FEEDATA_PROTOCOL } from "../../../constants/api";
import styles from "../chart.scss";
import Card from "../../Card";

export const FeesChart = ({ protocol }) => {
  const { isLoading, isError, data, error } = useFetcher(FEEDATA_PROTOCOL, protocol, { dataType: "dailyFees" });

  let chartData = data && data.totalDataChart.map(([date, value]) => [date * 1000, value]);

  const options = {
    chart: {
      zoomType: "x",
      styledMode: true,
    },
    credits: {
      enabled: false,
    },

    title: {
      text: "Fees Chart",
    },
    series: [
      {
        data: chartData,
      },
    ],
    xAxis: {
      type: "datetime",
    },
    yAxis: {},
  };

  return (
    <Card>
      {isLoading && <span>Loading...</span>}
      {isError && <span>{error.message}</span>}

      {!isLoading && !isError && (
        <HighchartsReact
          highcharts={Highcharts}
          options={options}
        />
      )}
    </Card>
  );
};
