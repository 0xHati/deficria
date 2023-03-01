const FEE_DATA = "https://api.llama.fi/overview/fees/";
const FEE_DATA_PROTOCOL = "https://api.llama.fi/summary/fees/";
const TVL = "https://api.llama.fi/protocols/";
const DEX = "https://api.llama.fi/overview/dexs/";

export const fetchData = async (endpoint) => {
  const result = await fetch(endpoint);
  const data = await result.json();
  return data;
};

// fee overview
export const fetchFeeData = (chain, params = { excludeTotalDataChart: false, excludeTotalDataChartBreakdown: true, dataType: "dailyFees" }) => {
  const query = (chain ? chain : "") + "?" + new URLSearchParams(params);
  return fetchData(FEE_DATA + query);
};

//protocol summary
export const fetchFeeDataProtocol = (protocol, params = { dataType: "dailyFees" }) => {
  return fetchData(FEE_DATA_PROTOCOL + protocol + "?" + new URLSearchParams(params));
};

export const fetchTVL = () => {
  return fetchData(TVL);
};

export const fetchDexVolume = (params = { excludeTotalDataChart: false, excludeTotalDataChartBreakdown: true, dataType: "dailyVolume" }) => {
  const query = DEX + "?" + new URLSearchParams(params);
  return fetchData(query);
};
