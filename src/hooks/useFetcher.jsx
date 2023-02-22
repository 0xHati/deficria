import { useQueries, useQuery } from "react-query";

const fetchData = async (endpoint, path, params = {}) => {
  endpoint = path ? endpoint + path + "?" : endpoint;
  const response = await fetch(endpoint + new URLSearchParams(params));
  if (!response.ok) throw new Error("Error: " + response.status);

  const data = await response.json();

  return data;
};

//{ key, url, path, params }
export const useFetcher = (query, isSuspense = false) => {
  const { key, url, path, params } = query;
  return useQuery({ queryKey: key, queryFn: fetchData.bind(null, url, path, params), suspense: isSuspense });

  // if (queries.length === 1) {
  //   const { key, url, path, params } = queries[0];
  //   return useQuery({ queryKey: key, queryFn: fetchData.bind(null, url, path, params), suspense: isSuspense });
  // } // } else {
  // //   const queryData = queries.map(({ key, url, path, params }) => ({
  // //     queryKey: key,
  // //     queryFn: fetchData.bind(null, url, path, params),
  // //     suspense: isSuspense,
  // //   }));
  // //   return useQueries(queryData);
  // // }
};
