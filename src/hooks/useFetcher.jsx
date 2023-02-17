import { useQuery } from "react-query";
import { DEXDATA, FEEDATA } from "../constants/api";

const fetchData = async (endpoint) => {
  const result = await fetch(endpoint);
  const data = await result.json();

  return data;
};

export const useFetcher = (key) => {
  switch (key) {
    case FEEDATA: {
      return useQuery("feeData", fetchData.bind(null, FEEDATA));
    }
    case DEXDATA:
      return useQuery("dexData", fetchData.bind(null, FEEDATA));
  }
};
