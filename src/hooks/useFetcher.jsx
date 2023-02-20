import { useQuery } from "react-query";

const fetchData = async (endpoint, path, params = {}) => {
  endpoint = path ? endpoint + path + "?" : endpoint;
  const response = await fetch(endpoint + new URLSearchParams(params));
  if (!response.ok) throw new Error("Error: " + response.status);

  const data = await response.json();
  return data;
};

export const useFetcher = (request, path, params) => {
  return useQuery(request.key, fetchData.bind(null, request.endpoint, path, params));
};
