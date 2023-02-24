import Card from "../../Card";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "../highChartsTheme";
import { getOptions, color } from "highcharts";

const FeeHistoryChart = ({ data }) => {
  const transformedData = data.map(([time, value]) => {
    return [new Date(time * 1000).getTime(), value];
  });

  console.log(getOptions());
  const options = {
    chart: {
      zoomType: "x",
      type: "area",
    },

    plotOptions: {
      series: {
        fillColor: {
          linearGradient: [0, 0, 0, 300],
          stops: [
            [0, getOptions().colors[0]],
            [1, color(getOptions().colors[0]).setOpacity(0).get("rgba")],
          ],
        },
      },
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
    <Card>
      <HighchartsReact
        highcharts={Highcharts}
        options={options}
      />
    </Card>
  );
};

export default FeeHistoryChart;
