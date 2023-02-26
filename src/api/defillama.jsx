const FEE_DATA = "https://api.llama.fi/overview/fees/";
const FEE_DATA_PROTOCOL = "https://api.llama.fi/summary/fees/";

export const fetchData = async (endpoint) => {
  console.log(endpoint);
  const result = await fetch(endpoint);
  const data = await result.json();
  return data;
};

export const fetchFeeData = (chain, params = { excludeTotalDataChart: false, excludeTotalDataChartBreakdown: true, dataType: "dailyFees" }) => {
  const query = (chain ? chain : "") + "?" + new URLSearchParams(params);
  return fetchData(FEE_DATA + query);
};

export const fetchFeeDataProtocol = (protocol, params = { dataType: "dailyFees" }) => {
  return fetchData(FEE_DATA_PROTOCOL + protocol + "?" + new URLSearchParams(params));
};
