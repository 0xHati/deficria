import HighchartsReact from "highcharts-react-official";
import Highcharts from "../highChartsTheme";
import Card from "../../Card";
import { TimeFrameSelector } from "../../TimeFrameSelector/TimeFrameSelector";
import { TIMEFRAMES_LIMITED } from "../../../constants/timeframes";
import { useReducer } from "react";
import { groupDatesByPeriod } from "../../../utils/helpers";

const reducer = (state, action) => {
  if (action.type === "total24h") {
    return {
      initial: state.initial,
      fees: state.initial.fees,
      revenue: state.initial.revenue,
      timeFrame: "total24h",
    };
  }
  if (action.type === "total7d") {
    return {
      initial: state.initial,
      fees: groupDatesByPeriod(state.initial.fees, "total7d"),
      revenue: groupDatesByPeriod(state.initial.revenue, "total7d"),
      timeFrame: "total7d",
    };
  }
  if (action.type === "total30d") {
    return {
      initial: state.initial,
      fees: groupDatesByPeriod(state.initial.fees, "total30d"),
      revenue: groupDatesByPeriod(state.initial.revenue, "total30d"),
      timeFrame: "total30d",
    };
  }
};

export const FeeProtocolChart = ({ dataSets }) => {
  const [state, dispatch] = useReducer(reducer, {
    initial: dataSets,
    fees: groupDatesByPeriod([...dataSets.fees], "total7d"),
    revenue: groupDatesByPeriod([...dataSets.revenue], "total7d"),
    timeFrame: "total7d",
  });

  const options = {
    chart: {
      zoomType: "x",
      type: "column",
    },
    series: [
      {
        name: "Fees",
        data: state.fees,
        showInLegend: Boolean(!state.fees.every(([y, value]) => value === 0)),
      },
      {
        name: "Revenue",
        data: state.revenue,
        showInLegend: Boolean(!state.revenue.every(([y, value]) => value === 0)),
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
    dispatch({ type: timeFrame });
  };

  return (
    <Card>
      <TimeFrameSelector
        timeFrames={TIMEFRAMES_LIMITED}
        timeFrame={state.timeFrame}
        onSetTimeFrame={handleChangeTimeFrame}
        displayShort={false}
      />
      <HighchartsReact
        highcharts={Highcharts}
        options={options}
      />
    </Card>
  );
};
