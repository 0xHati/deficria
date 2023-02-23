import styles from "../chart.scss";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import { useEffect, useState, useRef } from "react";
import { useChart } from "../../../hooks/useChart";

const FeesPieChart = ({ data }) => {
  console.log(data);
  const [chartOptions, setChartOptions] = useState({
    chart: {
      type: "pie",
    },
    series: [
      {
        name: "Share",
        data: data,
      },
    ],
  });
  const chart = useRef(null);

  // useEffect(() => {
  //   const options = {
  //     chart: {
  //       type: "pie",
  //     },
  //     series: [
  //       {
  //         name: "Share",
  //         data: data,
  //       },
  //     ],
  //   };
  //   setChartOptions(options);
  //   return () => {
  //     console.log(chart);
  //     chart.current.chart.destroy();
  //   };
  // }, [data]);

  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={chartOptions}
    />
  );
};

export default FeesPieChart;
