import HighchartsReact from "highcharts-react-official";
import Highcharts from "./highChartsTheme";
import { formatNumberToLocale, formatDate } from "../../utils/helpers";
import Card from "../Card";
import { COLORS } from "./highChartsTheme";

const LineChart = ({ data, title, ...props }) => {
  const transformedData = data.map((entry) => {
    let time, val;
    if (typeof entry === "object") {
      [time, val] = Object.values(entry);
    }
    if (typeof entry === "array") {
      [time, val] = entry;
    }
    return [new Date(time * 1000).getTime(), val];
  });

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
        name: "Total fee history",
        data: transformedData,
      },
    ],
    tooltip: {
      formatter: function () {
        return `<br/><span> ${formatDate(this.x)}<br/><span style='font-weight: bold'> ${formatNumberToLocale(this.y)}</span>`;
      },
    },

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
          value: transformedData[transformedData.length - 1][1],
          width: "1",
          dashStyle: "dash",

          label: {
            text: formatNumberToLocale(transformedData[transformedData.length - 1][1], true),
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
