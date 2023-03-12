import HighchartsReact from "highcharts-react-official";
import { Suspense, useMemo } from "react";
import Card from "../Card";
import Highcharts from "./highChartsTheme";
import { unixToMs, formatNumberToLocale, formatDate } from "../../utils/helpers";
import { COLORS } from "./highChartsTheme";

const StackedLineChart = ({ data, title, ...props }) => {
  const series = Object.entries(data).map(([name, data], index) => {
    return {
      name: name,
      data: data,
      fillColor: COLORS.SERIES[index],
      //needed to get the color in the tooltip
      color: COLORS.SERIES[index],
    };
  });

  const options = {
    chart: {
      type: "area",
      zoomType: "x",
    },
    title: {
      text: title,
    },

    tooltip: {
      formatter: function () {
        return this.points.reduce(function (s, point) {
          console.log(point);
          return s + `<br/><span style='color:${point.color}'> ${point.series.name}</span>: ${formatNumberToLocale(point.y)}`;
        }, "<b>" + formatDate(this.x) + "</b>");
      },

      shared: true,
    },
    plotOptions: {
      area: {
        stacking: "normal",
        lineWidth: 1,
      },
      series: {
        marker: {
          enabled: false,
          states: {
            hover: {
              enabled: false,
            },
          },
        },
      },
    },
    xAxis: {
      type: "datetime",
    },
    series: series,
    legend: {
      enabled: true,
    },
  };
  return (
    <Card className={props.className}>
      <HighchartsReact
        highcharts={Highcharts}
        options={options}
        constructorType={"stockChart"}
      />
    </Card>
  );
};

export default StackedLineChart;
