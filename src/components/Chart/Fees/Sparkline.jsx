import Highcharts from "../highChartsTheme";
import HighchartsReact from "highcharts-react-official";
import { COLORS } from "../highChartsTheme";

const Sparkline = ({ data, margin }) => {
  const [[marginKey, value]] = Object.entries(margin);
  const options = {
    chart: {
      backgroundColor: null,
      borderWidth: 0,
      type: "line",
      margin: [2, 0, 2, 0],
      width: 120,
      height: 20,
      style: {
        overflow: "visible",
        [marginKey]: value,
      },
      skipClone: true,
    },
    title: {
      text: "",
    },
    credits: {
      enabled: false,
    },
    xAxis: {
      visible: false,
    },
    yAxis: {
      endOnTick: false,
      startOnTick: false,
      labels: {
        enabled: false,
      },
      title: {
        text: null,
      },
      tickPositions: [0],
    },
    legend: {
      enabled: false,
    },
    tooltip: {
      enabled: false,
    },
    plotOptions: {
      series: {
        animation: false,
        lineWidth: 1.5,
        shadow: false,
        states: {
          hover: {
            enabled: false,
          },
        },
      },
    },
    area: {
      linecolor: "white",
    },
    series: [
      {
        name: "Values",
        data: data,
        color: COLORS.SERIES[0],
      },
    ],
  };

  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={options}
    />
  );
};

export default Sparkline;
