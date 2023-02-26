import HighchartsReact from "highcharts-react-official";
import Highcharts from "../highChartsTheme";
import Card from "../../Card";
import { TimeFrameSelector } from "../../TimeFrameSelector/TimeFrameSelector";
import { TIMEFRAMES_LIMITED } from "../../../constants/timeframes";
import { useReducer, useState } from "react";
import { groupDatesByPeriod } from "../../../utils/helpers";

export const FeeProtocolChart = ({ dataSets }) => {
  // need to spread the datasets since we don't want to reference the original since we need it to go back to dates,
  // if not we dillute everytime we group the data by week/month
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
      },
      {
        name: "Revenue",
        data: [...dataSets.revenue],
        showInLegend: Boolean(!dataSets.revenue.every(([y, value]) => value === 0)),
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
    setChartOptions({
      series: [
        {
          data: groupDatesByPeriod(dataSets.fees, timeFrame),
        },
        {
          data: groupDatesByPeriod(dataSets.revenue, timeFrame),
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
