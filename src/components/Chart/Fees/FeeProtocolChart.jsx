import HighchartsReact from "highcharts-react-official";
import Highcharts from "../highChartsTheme";
import { COLORS } from "../highChartsTheme";
import Card from "../../Card";
import { TimeFrameSelector } from "../../TimeFrameSelector/TimeFrameSelector";
import { TIMEFRAMES_LIMITED } from "../../../constants/timeframes";
import { useState } from "react";
import { groupDatesByPeriod } from "../../../utils/helpers";
import { time } from "highcharts";

export const FeeProtocolChart = ({ dataSets }) => {
  const options = {
    chart: {
      zoomType: "x",
      type: "column",
    },

    series: [
      {
        name: "Fees",
        data: [...dataSets.fees],
        showInLegend: Boolean(!dataSets.fees.every(([y, value]) => value === 0)),
        color: Highcharts.theme.colors[0],
      },
      {
        name: "Revenue",
        data: [...dataSets.revenue],
        showInLegend: Boolean(!dataSets.revenue.every(([y, value]) => value === 0)),
        color: Highcharts.theme.colors[1],
      },
      {
        name: "Moving average fees (90d)",
        type: "spline",
        data: calculateSMA(dataSets.fees),
        color: Highcharts.theme.colors[3],

        showInLegend: true,
      },
    ],

    xAxis: {
      type: "datetime",
      min: new Date(2020, 1, 1).getTime(),
    },
    yAxis: {
      title: {
        text: "Amount in usd",
      },
    },
    plotOptions: {
      column: {
        stacking: "normal",
      },
    },
  };
  const [chartOptions, setChartOptions] = useState(options);
  const [timeFrame, setTimeFrame] = useState("total24h");

  const handleChangeTimeFrame = (timeFrame) => {
    const window = timeFrame === "total24?" ? 90 : timeFrame === "total7d" ? 13 : 3;
    const feeData = groupDatesByPeriod(dataSets.fees, timeFrame);
    setChartOptions({
      series: [
        {
          data: feeData,
        },
        {
          data: groupDatesByPeriod(dataSets.revenue, timeFrame),
        },
        {
          data: calculateSMA(feeData, window),
        },
      ],
    });
    setTimeFrame(timeFrame);
  };

  return (
    <Card>
      <TimeFrameSelector
        timeFrames={TIMEFRAMES_LIMITED}
        timeFrame={timeFrame}
        onSetTimeFrame={handleChangeTimeFrame}
        displayShort={false}
      />
      <HighchartsReact
        highcharts={Highcharts}
        options={chartOptions}
      />
    </Card>
  );
};

const calculateSMA = (data, windowSize = 90) => {
  const movingAverages = [];

  for (let i = 0; i < data.length; i++) {
    const window = data.slice(Math.max(0, i - windowSize + 1), i + 1);
    const sum = window.reduce((acc, curr) => acc + curr[1], 0);
    const average = sum / windowSize;
    movingAverages.push([data[i][0], average]);
  }
  return movingAverages;
};
