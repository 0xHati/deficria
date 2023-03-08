import HighchartsReact from "highcharts-react-official";
import Highcharts from "../highChartsTheme";
import { COLORS } from "../highChartsTheme";
import Card from "../../Card";
import { formatNumberToLocale } from "../../../utils/helpers";

//we apply the threshold on the totalFees, first filter all the values > threshold,
// calculate the sum of the them and to get the others amount we do the total - the sum
const createThreshold = (data, totalFees, totalRevenue, threshold) => {
  const filteredData = data.filter(([category, { dailyFees }]) => {
    console.log((dailyFees / totalFees) * 100);
    return (dailyFees / totalFees) * 100 > threshold;
  });
  const sum = filteredData.reduce(
    (acc, [category, { dailyFees, dailyRevenue }]) => {
      acc[0] += dailyFees;
      acc[1] += dailyRevenue;
      return acc;
    },
    [0, 0]
  );
  filteredData.push(["Other", { dailyFees: totalFees - sum[0], dailyRevenue: totalRevenue - sum[1] }]);
  return filteredData;
};

const FeesCategoryChart = ({ data }) => {
  const totalFees = data.total24h;
  const totalRevenue = data.dailyRevenue;
  const chartData = {};

  //the idea is to have a treshold on the data so we have a category 'others'
  //here we aggregate the data and create groups with their dailyfees and rev
  data.protocols.map(({ category, dailyRevenue, total24h }) => {
    if (!chartData[category]) {
      chartData[category] = { dailyFees: total24h, dailyRevenue: dailyRevenue };
    } else {
      chartData[category].dailyFees += total24h;
      chartData[category].dailyRevenue += dailyRevenue;
    }
  });

  const transformedData = createThreshold(Object.entries(chartData), totalFees, totalRevenue, 1);

  const options = {
    chart: {
      type: "bar",
    },

    title: {
      text: "Fees/Revenue per category",
    },
    xAxis: {
      categories: transformedData.map(([category]) => category),
    },
    yAxis: {
      min: 0,
      title: {
        text: "Amount in usd",
      },
    },
    tooltip: {
      formatter: function () {
        return this.points.reduce(function (s, point) {
          return s + `<br/><span style='color:${point.color}'> ${point.series.name}</span>: ${formatNumberToLocale(point.y)}`;
        }, "<b>" + this.x + "</b>");
      },
      shared: true,
      // headerFormat: '<span style="font-size:10px">{(point.key)}</span><table>',
      // pointFormat:
      //   '<tr><td ;padding:0">{series.name}: </td>' +
      //   '<td style="padding:0"><b>' +formatNumberToLocale({point.y}) +'</b></td></tr>',
      // footerFormat: "</table>",
      // shared: true,
      // useHTML: true,
    },
    plotOptions: {
      column: {
        pointPadding: 0.2,
        borderWidth: 0,
      },
    },
    series: [
      {
        name: "Fees",
        data: transformedData.map((item) => item[1].dailyFees),
        color: COLORS.SERIES[3],
        stacking: undefined,
      },
      {
        name: "Revenue",
        data: transformedData.map((item) => item[1].dailyRevenue),
        color: COLORS.SERIES[0],
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

export default FeesCategoryChart;
