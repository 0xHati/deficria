import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFacetedMinMaxValues,
} from "@tanstack/react-table";
import { Table } from "..";
import { useState, useEffect, useMemo } from "react";
import { getColumns } from "./columns";
import Filter from "../../Filter";
import defillama from "defillama-api";
import { useQuery } from "react-query";
import { fetchData, unixToMs, groupDatesByWeek } from "../../../utils/helpers";

import { subMonths } from "date-fns";

/*
The table can be expanded with all the data showing next to each other or collapsed with the option to toggle fees
*/

//how much months looking back we want to have the trendline for the sparklines graph
//eventually data is further grouped to have one point every week
const TIMESPAN_SPARKLINE = 3;

const FeesTable = ({ isExpanded = true, timeFrame = "total24h" }) => {
  const { data, isLoading } = useQuery(
    ["fees"],
    () => fetchData(defillama.feesRevenue.all({ exludeTotalDataChart: false, exludeTotalDataChartBreakdown: false })),
    false
  );

  useMemo(() => transformDataSparkline(data, TIMESPAN_SPARKLINE), [data]);

  const globalFilterFn = (row, columnId, filterValue) => {
    const search = filterValue.toLowerCase();

    let value = row.getValue(columnId);
    if (typeof value === "number") value = String(value);

    return value?.toLowerCase().includes(search);
  };

  const columnSorting = [
    {
      id: timeFrame,
      desc: true,
    },
  ];

  const inititalColumnOrder = isExpanded
    ? ["name", "category", "total24h", "total7d", "total30d", "totalAllTime", "change_1d"]
    : ["name", "category", "total24h", "total7d", "total30d", "totalAllTime", "change_1d", "change_7d", "change_1m"];
  const [sorting, setSorting] = useState(columnSorting);
  const [columnVisibility, setColumnVisibility] = useState();
  const [columnOrder, setColumnOrder] = useState(inititalColumnOrder);
  const [globalFilter, setGlobalFilter] = useState("");

  // since the column is not expanded all column names will be 'fees' and visibility change depending on selection

  useEffect(() => {
    setSorting(columnSorting);
    setColumnVisibility(
      !isExpanded
        ? { change_7d: false, change_1m: false, total24h: false, total7d: false, total30d: false, totalAllTime: false, [timeFrame]: true }
        : {}
    );
  }, [timeFrame]);

  const tableInstance = useReactTable({
    columns: getColumns(isExpanded),
    data: data.protocols,
    state: {
      columnOrder,
      sorting,
      columnVisibility,
      globalFilter,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    disableSortRemove: true,
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
    getPaginationRowModel: !isExpanded ? getPaginationRowModel() : "",
    onColumnVisibilityChange: setColumnVisibility,
    onColumnOrderChange: setColumnOrder,
    globalFilterFn: globalFilterFn,
    onGlobalFilterChange: setGlobalFilter,
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <>
      {isExpanded && <Filter table={tableInstance} />}
      {!isLoading && (
        <Table
          tableInstance={tableInstance}
          linkTo={"/fees"}
        />
      )}
    </>
  );
};

const transformDataSparkline = (data, timespan) => {
  const referenceTime = subMonths(new Date(), timespan);

  const filteredData = data.totalDataChartBreakdown
    .map(([time, chains]) => [unixToMs(time), chains])
    .filter(([time]) => {
      return time > referenceTime;
    });
  const groupedData = groupDatesByWeek(filteredData);

  for (const protocol of data.protocols) {
    const protocolName = protocol.module;
    const valuesArray = [];

    for (const timestampData of groupedData) {
      const timestamp = timestampData[0];
      const protocolValue = timestampData[1][protocolName] || 0;
      valuesArray.push([timestamp, protocolValue]);
    }

    protocol.sparkline = valuesArray;
  }
};

export default FeesTable;
