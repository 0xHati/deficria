import HighchartsReact from 'highcharts-react-official';
import Highcharts from '../highChartsTheme';
import Card from '../../Card';
import { TimeFrameSelector } from '../../TimeFrameSelector/TimeFrameSelector';
import { TIMEFRAMES_LIMITED } from '../../../constants/timeframes';
import { useState } from 'react';
import { groupDatesByPeriod, formatNumberToLocale, formatDate } from '../../../utils/helpers';

export const FeeProtocolChart = ({ dataSets, ...props }) => {
  const options = {
    chart: {
      zoomType: 'x',
      type: 'column',
    },

    series: [
      {
        name: 'Fees',
        data: [...dataSets.fees],
        showInLegend: Boolean(!dataSets.fees.every(([y, value]) => value === 0)),
      },
      {
        name: 'Revenue',
        data: [...dataSets.revenue],
        showInLegend: Boolean(!dataSets.revenue.every(([y, value]) => value === 0)),
      },
      {
        name: 'Rolling moving average (fees) (90d)',
        type: 'spline',
        data: calculateSMA(dataSets.fees),
        showInLegend: true,
      },
    ],

    xAxis: {
      type: 'datetime',
    },
    yAxis: {
      title: {
        text: 'Amount in usd',
      },
    },
    tooltip: {
      formatter: function () {
        return this.points.reduce(function (s, point) {
          return s + (point.y > 0 ? `<br/><span style='color:${point.color}'> ${point.series.name}</span>: ${formatNumberToLocale(point.y)}` : '');
        }, '<b>' + formatDate(this.x) + '</b>');
      },
    },
    plotOptions: {
      column: {
        stacking: 'normal',
      },
    },
  };
  const [chartOptions, setChartOptions] = useState(options);
  const [timeFrame, setTimeFrame] = useState('total24h');

  const handleChangeTimeFrame = (timeFrame) => {
    const window = timeFrame === 'total24?' ? 90 : timeFrame === 'total7d' ? 13 : 3;
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
    <Card className={props.className}>
      <TimeFrameSelector
        timeFrames={TIMEFRAMES_LIMITED}
        timeFrame={timeFrame}
        onSetTimeFrame={handleChangeTimeFrame}
        displayShort={false}
      />
      <HighchartsReact
        highcharts={Highcharts}
        options={chartOptions}
        constructorType={'stockChart'}
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
