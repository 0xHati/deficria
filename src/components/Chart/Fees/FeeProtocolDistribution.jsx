import HighchartsReact from "highcharts-react-official";
import { Suspense, useMemo } from "react";
import Card from "../../Card";
import Highcharts from "../highChartsTheme";
import { unixToMs, formatNumberToLocale, formatDate } from "../../../utils/helpers";
import { COLORS } from "../highChartsTheme";

const FeeProtocolDistribution = ({ data, ...props }) => {
  let transformedData = {};

  useMemo(() => {
    data.forEach(([time, chains]) => {
      Object.entries(chains).forEach(([chain, value]) => {
        //sum over different versions on the chain (ex uni v1, uni v2)
        const sum = Object.values(value).reduce((acc, prev) => (acc += prev), 0);
        if (!transformedData[chain]) {
          transformedData[chain] = [[unixToMs(time), sum]];
        } else {
          transformedData[chain].push([unixToMs(time), sum]);
        }
      });
    });
  });

  const series = Object.entries(transformedData).map(([name, data], index) => {
    return {
      name: name,
      data: data,
      fillColor: COLORS.SERIES[index],
    };
  });

  const options = {
    chart: {
      type: "area",
      zoomType: "x",
    },
    title: {
      text: "Fee distribution over time",
    },

    tooltip: {
      formatter: function () {
        return this.points.reduce(function (s, point) {
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

export default FeeProtocolDistribution;
