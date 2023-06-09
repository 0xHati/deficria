import HighchartsReact from "highcharts-react-official";
import { useMemo } from "react";
import Card from "../../Card";
import Highcharts from "../highChartsTheme";
import { unixToMs } from "../../../utils/helpers";

const FeeDistributionChartHistory = ({ data, ...props }) => {
  let transformedData = {};

  useMemo(() => {
    data.forEach(([time, chains]) => {
      Object.entries(chains).forEach(([chain, value]) => {
        if (!transformedData[chain]) {
          transformedData[chain] = [[unixToMs(time), value]];
        } else {
          transformedData[chain].push([unixToMs(time), value]);
        }
      });
    });
  }, [data]);

  const series = Object.entries(transformedData).map(([name, data]) => {
    return { name: name, data: data };
  });

  const options = {
    chart: {
      type: "line",
    },
    title: {
      text: "Fee distribution over time",
    },

    tooltip: {
      shared: true,
    },
    plotOptions: {
      area: {
        stacking: "normal",
        lineWidth: 1,
        marker: {
          lineWidth: 1,
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

export default FeeDistributionChartHistory;
