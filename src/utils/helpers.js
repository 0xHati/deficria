export const formatNumberToLocale = function (number) {
  return number.toLocaleString(navigator.language, { style: "currency", currency: "USD" });
};

// export const getLogo = function (name) {
//   return `https://icons.llama.fi/chains/${name}.png`;
// };
