import HighchartsReact from "highcharts-react-official";
import Highcharts from "../highChartsTheme";

import Card from "../../Card";
import { TimeFrameSelector } from "../../TimeFrameSelector/TimeFrameSelector";
import { TIMEFRAMES, TIMEFRAMES_DISPLAY_LONG } from "../../../constants/timeframes";
import { useState, useEffect } from "react";
import { groupDatesByPeriod } from "../../../utils/helpers";

//TODO: refactor also a bug where sometimes chart doesn't go back to day data.
export const FeeProtocolChart = ({ dataSets }) => {
  const [dataFees, dataRevenue] = dataSets;
  const [selectedTimeFrame, setSelectedTimeFrame] = useState(TIMEFRAMES.day);
  const [dataFeesDay, setDataFeesDay] = useState(dataFees.data);
  const [dataRevenueDay, setDataRevenueDay] = useState(dataRevenue.data);

  const activeStateInitial = {};

  dataSets.forEach((element) => {
    activeStateInitial[element.name] = [...element.data];
  });

  const [activeData, setActiveData] = useState(activeStateInitial);

  const timeFrames = {
    [TIMEFRAMES.day]: TIMEFRAMES_DISPLAY_LONG.day,
    [TIMEFRAMES.week]: TIMEFRAMES_DISPLAY_LONG.week,
    [TIMEFRAMES.month]: TIMEFRAMES_DISPLAY_LONG.month,
  };

  const options = {
    chart: {
      zoomType: "x",
      type: "column",
    },
    title: {
      text: "",
    },
    series: [
      {
        name: "Fees",
        data: activeData.fees,
        showInLegend: Boolean(activeData.fees.length !== 0),
      },
      {
        name: "Revenue",
        data: activeData.revenue,
        showInLegend: Boolean(activeData.revenue.length !== 0),
      },
    ],

    xAxis: {
      type: "datetime",
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

  const handleChangeTimeFrame = (timeFrame) => {
    if (timeFrame === TIMEFRAMES.day) {
      setSelectedTimeFrame(TIMEFRAMES.day);
      setActiveData({ fees: dataFeesDay, revenue: dataRevenueDay });
    }
    if (timeFrame === TIMEFRAMES.week) {
      setSelectedTimeFrame(TIMEFRAMES.week);
      setActiveData({
        fees: groupDatesByPeriod(dataFeesDay, TIMEFRAMES.week),
        revenue: groupDatesByPeriod(dataRevenueDay, TIMEFRAMES.week),
      });
    }
    if (timeFrame === TIMEFRAMES.month) {
      setSelectedTimeFrame(TIMEFRAMES.month);
      setActiveData({
        fees: groupDatesByPeriod(dataFeesDay, TIMEFRAMES.month),
        revenue: groupDatesByPeriod(dataRevenueDay, TIMEFRAMES.month),
      });
    }
  };

  return (
    <Card>
      <TimeFrameSelector
        timeFrames={Object.entries(timeFrames)}
        selectedTimeFrame={selectedTimeFrame}
        onClick={handleChangeTimeFrame}
      />
      <HighchartsReact
        highcharts={Highcharts}
        options={options}
      />
    </Card>
  );
};
