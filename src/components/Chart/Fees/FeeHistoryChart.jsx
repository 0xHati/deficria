import HighchartsReact from "highcharts-react-official";
import Highcharts from "../highChartsTheme";

const FeeHistoryChart = ({ data }) => {
  const transformedData = data.map(([time, value]) => {
    return [new Date(time * 1000).getTime(), value];
  });

  const options = {
    chart: {
      zoomType: "x",
      type: "area",
    },
    title: {
      text: "Combined Fee History",
    },
    series: [
      {
        name: "Total fee history",
        data: transformedData,
      },
    ],

    xAxis: {
      type: "datetime",
    },
    yAxis: {
      title: {
        text: "Amount in usd",
      },
    },
  };
  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={options}
    />
  );
};

export default FeeHistoryChart;
