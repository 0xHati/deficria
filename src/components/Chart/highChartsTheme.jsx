import Highcharts from 'highcharts/highstock';
import annotations from 'highcharts/modules/annotations';

export const COLORS = {
  BG: '#12182b',
  TEXT: ['#fff', '#c1c8cd'],
  GRID: '#16272534',
  TOOLTIP_BG: '#1d395d',
  PIE: ['#a2bee2', '#739dd3', '#457cc4', '#2962b1', '#09b4f7', '#3521bb', '#0fc9da', '#2f297c', '#141acb', '#880de7'],
  SERIES: [
    '#a2bee2',
    '#e89907',
    '#09f780',
    '#09b4f7',
    '#84cc10',
    '#9d458e',
    '#3521bb',
    '#bb2121',
    '#6d814d',
    '#0fc9da',
    '#614104',
    '#6d814d',
    '#0fc9da',
    '#614104',
  ],
  AREA: '#22426d',
  ACCENT: '#d0ff00',
  ACCENT_DARK: '#212900',
  BUTTON: '#315f9b',
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
      color: COLORS.TEXT[0],
      fontSize: '1.6rem',
    },
    text: undefined,
  },
  legend: {
    itemStyle: {
      color: COLORS.TEXT[0],
    },
  },
  xAxis: {
    labels: {
      style: {
        color: COLORS.TEXT[0],
      },
    },
    title: {
      style: {
        color: COLORS.TEXT[0],
      },
    },
    gridLineColor: COLORS.GRID,
  },
  yAxis: {
    labels: {
      style: {
        color: COLORS.TEXT[0],
      },
    },
    opposite: false,
    title: {
      style: {
        color: COLORS.TEXT[0],
      },
    },
    gridLineColor: COLORS.GRID,
  },
  tooltip: {
    style: {
      color: COLORS.TEXT[0],
    },
    outside: true,

    borderRadius: '10',
    backgroundColor: COLORS.TOOLTIP_BG,
  },
  plotOptions: {
    pie: {
      colors: COLORS.SERIES,
      dataLabels: {
        style: {
          color: COLORS.TEXT[0],
        },
      },
    },
    area: {
      lineColor: COLORS.SERIES[0],
      color: {
        linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
        stops: [
          [0, 'transparent'],
          [1, COLORS.AREA],
        ],
      },
    },
    series: {
      stacking: 'normal',
      borderColor: 'none',
      animation: false,
      marker: {
        lineColor: COLORS.ACCENT,
        radius: 6,
      },
    },
    stacking: 'normal',
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
      fill: 'none',
      r: '5',
      style: {
        color: COLORS.TEXT[1],
        fontWeight: 'bold',
        border: `1px solid ${COLORS.TEXT[0]}`,
        opacity: 0.8,
      },
      states: {
        hover: {
          fill: COLORS.AREA,
          style: {
            color: COLORS.TEXT[0],
            opacity: 1,
          },
        },
        select: {
          fill: COLORS.BUTTON,
          style: {
            color: COLORS.TEXT[0],
            opacity: 1,
          },
        },
        disabled: {
          style: {
            opacity: 0.5,
          },
        },
      },
    },
    labelStyle: {
      display: 'none',
    },

    inputEnabled: false,
  },
};

Highcharts.setOptions(Highcharts.theme);
annotations(Highcharts);

export default Highcharts;
