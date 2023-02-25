import { getISOWeek, endOfWeek, endOfMonth } from "date-fns";
import { TIMEFRAMES } from "../constants/timeframes";

export const formatNumberToLocale = function (number) {
  return number.toLocaleString(navigator.language, { style: "currency", currency: "USD" });
};

export const slug = (string) => {
  return string
    .split(" ")
    .map((word) => word.toLowerCase())
    .join("-");
};

export const styleNumber = (value) => {
  if (value > 0) return "positive";
  if (value < 0) return "negative";
  else return "";
};

// expects and array of arrays [date, value]
export const groupDatesByWeek = (data) => {
  return data.reduce((acc, [date, value]) => {
    const fullDate = new Date(date);
    const endWeek = endOfWeek(fullDate, { weekStartsOn: 1 });
    const index = acc.findIndex((week) => week[0] === endWeek.getTime());

    if (index === -1) {
      // If the week isn't in the accumulator, add a new array with the date and value
      acc.push([endWeek.getTime(), value]);
    } else {
      // If the week is in the accumulator, add the value to the existing array
      acc[index][1] += value;
    }

    return acc;
  }, []);
};

export const groupDatesByMonth = (data) => {
  if (data.length === 0) return [];
  return data.reduce((acc, [date, value]) => {
    const fullDate = new Date(date);
    const endMonth = endOfMonth(fullDate);
    const index = acc.findIndex((month) => month[0] === endMonth.getTime());

    if (index === -1) {
      // If the week isn't in the accumulator, add a new array with the date and value
      acc.push([endMonth.getTime(), value]);
    } else {
      // If the week is in the accumulator, add the value to the existing array
      acc[index][1] += value;
    }
    return acc;
  }, []);
};

export const groupDatesByPeriod = (data, period) => {
  if (period === "total7d") {
    return groupDatesByWeek(data);
  }
  if (period === "total30d") {
    return groupDatesByMonth(data);
  }
};

export const calculateFeeStats = (data) => {
  const { total7d, total24h, total30d, protocols } = data;
  const sorted24h = [...protocols].sort((a, b) => b.total24h - a.total24h);
  const sorted7d = [...protocols].sort((a, b) => b.total7d - a.total7d);
  const sorted30d = [...protocols].sort((a, b) => b.total30d - a.total30d);

  return protocols.map((protocol) => {
    return {
      name: protocol.name,
      total24h: {
        percentage: protocol.total24h / total24h,
        rank: sorted24h.indexOf(protocol) + 1,
        change: protocol.change_1d,
        fees: protocol.total24h,
      },
      total7d: {
        percentage: protocol.total7d / total7d,
        rank: sorted7d.indexOf(protocol) + 1,
        change: protocol.change_7d,
        fees: protocol.total7d,
      },
      total30d: {
        percentage: protocol.total30d / total30d,
        rank: sorted30d.indexOf(protocol) + 1,
        change: protocol.change_1m,
        fees: protocol.total30d,
      },

      totalProjects: protocols.length,
    };
  });
};

export const getNextTimeFrame = (timeFrames, currentTimeFrame) => {
  const currentIndex = timeFrames.indexOf(currentTimeFrame);
  const nextIndex = (currentIndex + 1) % timeFrames.length;
  return timeFrames[nextIndex];
};
