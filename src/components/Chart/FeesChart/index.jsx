import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";

import Card from "../../Card";
import { TimeFrameSelector } from "../../TimeFrameSelector/TimeFrameSelector";
import { TIMEFRAMES, TIMEFRAMES_DISPLAY_LONG } from "../../../constants/timeframes";
import { useState, useEffect } from "react";
import { groupDatesByMonth, groupDatesByWeek } from "../../../utils/helpers";
import styles from "../chart.scss";

const groupDatesByPeriod = (data, period) => {
  if (period === TIMEFRAMES.day) {
    return data;
  }
  if (period === TIMEFRAMES.week) {
    return groupDatesByWeek(data);
  }
  if (period === TIMEFRAMES.month) {
    return groupDatesByMonth(data);
  }
};

export const FeesChart = ({ dataFees, dataRevenue }) => {
  const [selectedTimeFrame, setSelectedTimeFrame] = useState(TIMEFRAMES.day);
  const [dataFeesDay, setDataFeesDay] = useState(dataFees);
  const [dataRevenueDay, setDataRevenueDay] = useState(dataRevenue);
  // const [dataFeesWeek, setDataFeesWeek] = useState(groupDatesByWeek(dataFeesDay));
  // const [dataRevenueWeek, setDataRevenueWeek] = useState(groupDatesByWeek(dataRevenueDay));
  // const [dataFeesMonth, setDataFeesMonth] = useState(groupDatesByMonth(dataFeesDay));
  // const [dataRevenueMonth, setDataRevenueMonth] = useState(groupDatesByMonth(dataRevenueDay));

  const [activeData, setActiveData] = useState({ activeDataFees: [...dataFees], activeDataRevenue: [...dataRevenueDay] });

  const timeFrames = {
    [TIMEFRAMES.day]: TIMEFRAMES_DISPLAY_LONG.day,
    [TIMEFRAMES.week]: TIMEFRAMES_DISPLAY_LONG.week,
    [TIMEFRAMES.month]: TIMEFRAMES_DISPLAY_LONG.month,
  };

  const options = {
    chart: {
      zoomType: "x",
      styledMode: true,
    },
    credits: {
      enabled: false,
    },

    title: {
      text: "",
    },
    series: [
      {
        name: "Fees",
        data: activeData.activeDataFees,
      },
      {
        name: "Revenue",
        data: activeData.activeDataRevenue,
      },
    ],
    xAxis: {
      type: "datetime",
    },
    yAxis: {},
    // tooltip: {
    //   formatter: function () {
    //     return (
    //       "X value: " +
    //       this.x +
    //       "<br>" + // Add the x value to the tooltip
    //       "Y value: " +
    //       this.y +
    //       "<br>" + // Add the y value to the tooltip
    //       "Series name: " +
    //       this.series.name
    //     ); // Add the series name to the tooltip
    //   },
    // },
  };

  const handleChangeTimeFrame = (timeFrame) => {
    if (timeFrame === TIMEFRAMES.day) {
      setSelectedTimeFrame(TIMEFRAMES.day);
      console.log(dataFeesDay);
      setActiveData({ activeDataFees: dataFeesDay, activeDataRevenue: dataRevenueDay });
    }
    if (timeFrame === TIMEFRAMES.week) {
      setSelectedTimeFrame(TIMEFRAMES.week);
      setActiveData({
        activeDataFees: groupDatesByPeriod(dataFeesDay, TIMEFRAMES.week),
        activeDataRevenue: groupDatesByPeriod(dataRevenueDay, TIMEFRAMES.week),
      });
    }
    if (timeFrame === TIMEFRAMES.month) {
      setSelectedTimeFrame(TIMEFRAMES.month);
      setActiveData({
        activeDataFees: groupDatesByPeriod(dataFeesDay, TIMEFRAMES.month),
        activeDataRevenue: groupDatesByPeriod(dataRevenueDay, TIMEFRAMES.month),
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
