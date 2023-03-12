import { chart } from "highcharts";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "../highChartsTheme";
import Card from "../../Card";
import { COLORS } from "../highChartsTheme";
import { formatNumberToLocale, formatDate } from "../../../utils/helpers";

const THRESHOLD = 1; //threshold for 'other' category

const TVLCategoryChart = ({ data }) => {
  let chartData = {};
  data.map(({ category, tvl }) => {
    if (!chartData[category]) {
      chartData[category] = tvl;
    } else {
      chartData[category] += tvl;
    }
  });
  chartData = createThreshold(Object.entries(chartData), THRESHOLD);
  const options = {
    chart: {
      type: "bar",
    },

    title: {
      text: "TVL per category",
    },
    xAxis: {
      categories: chartData.map(([category, value]) => category),
    },
    yAxis: {
      min: 0,
      title: {
        text: "Amount in usd",
      },
    },
    tooltip: {
      formatter: function () {
        return `<br/><span> ${this.x}<br/><span style='font-weight: bold'> ${formatNumberToLocale(this.y)}</span>`;
      },
    },
    plotOptions: {
      column: {
        pointPadding: 0.2,
        borderWidth: 0,
      },
    },
    series: [
      {
        name: "TVL",
        data: chartData.map(([category, value]) => value),
        color: COLORS.SERIES[3],
        stacking: undefined,
      },
    ],
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

const createThreshold = (data, threshold) => {
  const sum = data.reduce((acc, [category, tvl]) => {
    acc += tvl;

    return acc;
  }, 0);
  const filteredData = data.filter(([category, tvl]) => {
    return (tvl / sum) * 100 > threshold;
  });

  const remaining = filteredData.reduce((acc, [category, tvl]) => {
    acc += tvl;
    return acc;
  }, 0);
  filteredData.push(["Other", sum - remaining]);
  return filteredData;
};

export default TVLCategoryChart;
