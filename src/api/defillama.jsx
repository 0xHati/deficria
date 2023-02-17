export const fetchData = async (endpoint) => {
  const result = await fetch(endpoint);
  const data = await result.json();

  return data;
};
