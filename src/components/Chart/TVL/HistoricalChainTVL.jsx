import HighchartsReact from "highcharts-react-official";
import { formatNumberToLocale, formatDate } from "../../../utils/helpers";
import Card from "../../Card";
import Highcharts from "../highChartsTheme";
import { COLORS } from "../highChartsTheme";

const HistoricalChainTVL = ({ data }) => {
  const transformedData = data.map(({ date, tvl }) => {
    date = new Date(date * 1000).getTime();
    return [date, tvl];
  });

  const options = {
    chart: {
      zoomType: "x",
      type: "area",
    },
    title: {
      text: "TVL history",
    },
    series: [
      {
        name: "TVL",
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
    <Card>
      <HighchartsReact
        highcharts={Highcharts}
        options={options}
        constructorType={"stockChart"}
      />
    </Card>
  );
};

export default HistoricalChainTVL;
