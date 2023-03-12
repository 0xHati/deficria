import HighchartsReact from "highcharts-react-official";
import Highcharts from "./highChartsTheme";
import Card from "../Card";
import { COLORS } from "./highChartsTheme";
import { formatNumberToLocale } from "../../utils/helpers";

const CategoryChart = ({ data, threshold }) => {
  const filteredData = createThreshold(Object.entries(data), threshold);
  const options = {
    chart: {
      type: "bar",
    },

    title: {
      text: "TVL per category",
    },
    xAxis: {
      categories: filteredData.map(([category, value]) => category),
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
        data: filteredData.map(([category, value]) => value),
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
  const sum = data.reduce((acc, [category, value]) => {
    acc += value;

    return acc;
  }, 0);
  const filteredData = data.filter(([category, value]) => {
    return (value / sum) * 100 > threshold;
  });

  const remaining = filteredData.reduce((acc, [category, value]) => {
    acc += value;
    return acc;
  }, 0);
  sum - remaining > 0 && filteredData.push(["Other", sum - remaining]);
  return filteredData;
};

export default CategoryChart;
