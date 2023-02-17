//crypto.randomUUID()

export const fees = {
  header: [
    { label: "protocol", key: "protocol" },
    { label: "daily fees", key: "dailyFees" },
    { label: "daily revenue", key: "dailyRevenue" },
    { label: "daily holder revenue", key: "dailyHolderRevenue" },
  ],
  data: [
    {
      protocol: "Ethereum",
      dailyFees: 10,
      dailyRevenue: 20,
      dailyHolderRevenue: 30,
      key: 1,
    },
    {
      protocol: "Polygon",
      dailyFees: 25,
      dailyRevenue: 40,
      dailyHolderRevenue: 60,
      key: 2,
    },
  ],
};
