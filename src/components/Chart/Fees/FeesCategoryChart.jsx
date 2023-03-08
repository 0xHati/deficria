import HighchartsReact from "highcharts-react-official";
import Highcharts from "../highChartsTheme";
import { COLORS } from "../highChartsTheme";
import Card from "../../Card";

const FeesCategoryChart = ({ data }) => {
  //dailyrev, dailyfees, category,

  //create groups

  const dailyFees = {};
  const dailyRevenue = {};

  data.protocols.forEach((protocol) => {
    if (!dailyFees[protocol.category]) {
      dailyFees[protocol.category] = protocol.dailyFees || 0;
    } else {
      dailyFees[protocol.category] += protocol.dailyFees || 0;
    }
    //could be added to the other if/else, but just to be sure for edge cases
    if (!dailyRevenue[protocol.category]) {
      dailyRevenue[protocol.category] = protocol.dailyRevenue || 0;
    } else {
      dailyRevenue[protocol.category] += protocol.dailyRevenue || 0;
    }
  });

  const options = {
    chart: {
      type: "column",
    },

    title: {
      text: "Fees/Revenue per category",
    },
    xAxis: {
      categories: Object.keys(dailyFees),
      // crosshair: true,
    },
    yAxis: {
      min: 0,
      title: {
        text: "Amount in usd",
      },
    },
    tooltip: {
      headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
      pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' + '<td style="padding:0"><b>{point.y:.1f}</b></td></tr>',
      footerFormat: "</table>",
      shared: true,
      useHTML: true,
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
        data: Object.values(dailyFees),
        color: COLORS.SERIES[3],
        stacking: undefined,
      },
      {
        name: "Revenue",
        data: Object.values(dailyRevenue),
        color: COLORS.SERIES[0],
      },
    ],
  };
  return (
    <Card>
      {" "}
      <HighchartsReact
        highcharts={Highcharts}
        options={options}
      />
    </Card>
  );
};

export default FeesCategoryChart;
