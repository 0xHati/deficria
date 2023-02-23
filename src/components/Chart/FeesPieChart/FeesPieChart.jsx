import styles from "../chart.scss";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import { useEffect, useState } from "react";

const FeesPieChart = ({ data }) => {
  //   [{ name: "test", y: 10 }];

  const [chartOptions, setChartOptions] = useState();

  useEffect(() => {
    const options = {
      chart: {
        type: "pie",
      },
      series: [
        {
          name: "Share",
          data: data,
        },
      ],
    };
    setChartOptions(options);
  }, [data]);

  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={chartOptions}
    />
  );
};

export default FeesPieChart;
