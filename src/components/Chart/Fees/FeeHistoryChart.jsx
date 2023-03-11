import HighchartsReact from "highcharts-react-official";
import Highcharts from "../highChartsTheme";
import { formatNumberToLocale } from "../../../utils/helpers";
import Card from "../../Card";

const FeeHistoryChart = ({ data, ...props }) => {
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
    tooltip: {
      formatter: function () {
        return `<br/><span> ${new Date(this.x).toLocaleDateString()}<br/><span style='font-weight: bold'> ${formatNumberToLocale(this.y)}</span>`;
      },
    },

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
    <Card className={props.className}>
      <HighchartsReact
        highcharts={Highcharts}
        options={options}
      />
    </Card>
  );
};

export default FeeHistoryChart;
