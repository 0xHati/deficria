// define global options here for all charts

import Highcharts from "highcharts";

const COLORS = {
  BG: "#162725",
  TEXT: "#d8e4ff",
  GRID: "#aebbc11a",
  TOOLTIP_BG: "#6b818c",
  SERIES: ["#e0cf15", "#72902b", "#f45b5b", "#91e8e1"],
};

Highcharts.theme = {
  colors: COLORS.SERIES,
  chart: {
    colors: COLORS.SERIES,
    backgroundColor: COLORS.BG,
  },
  credits: {
    enabled: false,
  },
  title: {
    style: {
      color: COLORS.TEXT,
    },
    text: undefined,
  },
  legend: {
    itemStyle: {
      color: COLORS.TEXT,
    },
  },
  xAxis: {
    labels: {
      style: {
        color: COLORS.TEXT,
      },
    },
    title: {
      style: {
        color: COLORS.TEXT,
      },
    },
    gridLineColor: "#16272534",
  },
  yAxis: {
    labels: {
      style: {
        color: COLORS.TEXT,
      },
    },
    title: {
      style: {
        color: COLORS.TEXT,
      },
    },
    gridLineColor: COLORS.GRID,
  },
  tooltip: {
    style: {
      color: COLORS.TEXT,
    },
    borderColor: "none",
    backgroundColor: COLORS.GRID,
  },
  plotOptions: {
    pie: {
      dataLabels: {
        style: {
          color: COLORS.TEXT,
        },
      },
    },
    series: {
      stacking: "normal",
      borderColor: "none",
    },
    stacking: "normal",
  },
};

Highcharts.setOptions(Highcharts.theme);
export default Highcharts;
