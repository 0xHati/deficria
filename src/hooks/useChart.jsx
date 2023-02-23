import { useEffect, useState } from "react";

export const useChart = (data) => {
  const [chartOptions, setChartOptions] = useState();

  useEffect(() => {
    const options = {
      chart: {
        type: "pie",
      },
      series: [
        {
          name: "Share",
          data: data,
        },
      ],
    };
    setChartOptions(options);
  }, [data]);

  return chartOptions;
};
