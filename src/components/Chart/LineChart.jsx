import HighchartsReact from "highcharts-react-official";
import Highcharts from "./highChartsTheme";
import { formatNumberToLocale, formatDate, unixToMs } from "../../utils/helpers";
import Card from "../Card";
import { COLORS } from "./highChartsTheme";

const LineChart = ({ data, title, annotations, ...props }) => {
  const ann = annotations?.map(([date, description]) => {
    const markerValue = data.find(({ x, y }) => x === unixToMs(date));
    console.log(markerValue);
    return { point: { xAxis: 0, yAxis: 0, x: unixToMs(date), y: markerValue?.y }, text: description };
  });
  console.log(ann);
  const options = {
    chart: {
      zoomType: "x",
      type: "area",
    },
    title: {
      text: title,
    },
    series: [
      {
        data: data,
        turboThreshold: 5000,
      },
    ],
    tooltip: {
      formatter: function () {
        return `<br/><span> ${formatDate(this.x)}<br/><span style='font-weight: bold'> ${formatNumberToLocale(this.y)}`;
      },
    },
    annotations: [
      {
        align: "right",
        shape: "connector",
        justify: false,
        crop: true,
        labelOptions: {
          backgroundColor: COLORS.ACCENT,
          style: {
            fontSize: "0.8em",
            color: "black",
          },
        },

        labels: ann,
      },
    ],

    xAxis: {
      type: "datetime",
    },
    yAxis: {
      title: {
        text: "Amount in usd",
      },
      plotLines: [
        {
          color: COLORS.ACCENT,
          value: data[data.length - 1].y,
          width: "1",
          dashStyle: "dash",

          label: {
            text: formatNumberToLocale(data[data.length - 1].y, true),
            useHTML: true,
            style: {
              color: COLORS.ACCENT_DARK,
              backgroundColor: COLORS.ACCENT,
              fontSize: "1.6rem",
              borderRadius: "20%",
              border: "2px solid black",
              padding: "2px",
            },
            y: -40,
            x: -10,
            align: "right",
          },
        },
      ],
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

export default LineChart;
