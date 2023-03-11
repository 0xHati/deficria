// define global options here for all charts

// import Highcharts from "highcharts";
import Highcharts from "highcharts/highstock";

export const COLORS = {
  BG: "#12182b",
  TEXT: "#fff",
  GRID: "#aebbc11a",
  TOOLTIP_BG: "#1d395d",
  PIE: ["#a2bee2", "#739dd3", "#457cc4", "#2962b1", "#09b4f7", "#3521bb", "#0fc9da", "#2f297c", "#141acb", "#880de7"],
  SERIES: ["#a2bee2", "#22426d", "#739dd3", "#e89907"],
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
    opposite: false,
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
      borderColor: "blue",
    },
    // borderColor: "none",
    borderRadius: "10",

    backgroundColor: COLORS.TOOLTIP_BG,
  },
  plotOptions: {
    pie: {
      colors: COLORS.PIE,
      dataLabels: {
        style: {
          color: COLORS.TEXT,
        },
      },
    },

    area: {
      lineColor: "#457cc4",
    },
    series: {
      stacking: "normal",
      borderColor: "none",
      color: {
        linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
        stops: [
          [0, "transparent"],
          [1, "#22426d"],
        ],
      },
      animation: false,
      marker: {
        lineColor: "#d0ff00",
        radius: 6,
      },
    },
    stacking: "normal",
  },
  navigator: {
    enabled: false,
  },
  scrollbar: {
    enabled: false,
  },
  rangeSelector: {
    allButtonsEnabled: false,
    selected: 1,
    buttonTheme: {
      fill: "none",
      r: 5,
      style: {
        color: COLORS.SERIES[0],
        fontWeight: "bold",
        border: "1px solid white",
      },
      states: {
        hover: {
          fill: "#22426d",
          style: {
            color: "#fff",
          },
        },
        select: {
          fill: "transparent",
          style: {
            color: "#d0ff00",
          },
        },
        // disabled: { ... }
      },
    },

    labelStyle: {
      display: "none",
    },

    inputEnabled: false,
  },
};

Highcharts.setOptions(Highcharts.theme);
export default Highcharts;
