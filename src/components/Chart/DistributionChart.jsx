import HighchartsReact from "highcharts-react-official";
import Highcharts from "./highChartsTheme";
import { useEffect, useState } from "react";

const createThreshold = (data, threshold) => {
  const filteredData = data.filter((item) => item.y > threshold);
  const sum = filteredData.reduce((acc, prevItem) => {
    return (acc += prevItem.y);
  }, 0);
  console.log(filteredData);
  filteredData.push({ name: "other", y: 100 - sum });
  return filteredData;
};

const DistributionChart = ({ data, title, threshold }) => {
  const filteredData = createThreshold(data, threshold);

  const options = {
    chart: {
      type: "pie",
    },
    title: {
      text: title,
    },

    series: [
      {
        name: "Share",
        data: filteredData,
      },
    ],

    tooltip: {
      formatter: function () {
        return `<text x="8" data-z-index="1" y="18"; font-size: 12px; ;"><tspan style="font-size: 10px;">${
          this.key
        }</tspan><tspan class="highcharts-br" dy="15" x="8">​</tspan><tspan style="color: ${this.color}; fill: ${
          this.color
        };">●</tspan> Share: <tspan style="font-weight: bold;">${this.y.toFixed(2)}%</tspan><tspan class="highcharts-br">​</tspan></text>`;
      },
    },
  };

  useEffect(() => {
    setChartOptions(options);
  }, [data]);

  const [chartOptions, setChartOptions] = useState(options);

  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={chartOptions}
    />
  );
};

export default DistributionChart;
