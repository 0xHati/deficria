export const DEXDATA = "https://api.llama.fi/overview/dexs?excludeTotalDataChart=true&excludeTotalDataChartBreakdown=true&dataType=dailyVolume";
export const FEEDATA_PROTOCOL = {
  key: "FEEDATA_PROTOCOL",
  endpoint: "https://api.llama.fi/summary/fees/",
};

export const FEE_DATA = {
  key: "FEE_DATA",
  endpoint: "https://api.llama.fi/overview/fees?excludeTotalDataChart=true&excludeTotalDataChartBreakdown=true&dataType=dailyFees",
};
// export const FEEDATA_PROTOCOL = (protocol, dataType = "dailyFees") => `https://api.llama.fi/summary/fees/${protocol}?dataType=${dataType}`;
