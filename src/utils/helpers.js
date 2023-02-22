import { getISOWeek, endOfWeek, endOfMonth } from "date-fns";

export const formatNumberToLocale = function (number) {
  return number.toLocaleString(navigator.language, { style: "currency", currency: "USD" });
};

// export const getLogo = function (name) {
//   return `https://icons.llama.fi/chains/${name}.png`;
// };

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
  const t = data.reduce((acc, [date, value]) => {
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
  console.log(t);
  return t;
};

export const groupDatesByMonth = (data) => {
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
