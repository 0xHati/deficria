import { Table } from "..";
import { getColumns } from "./columns";
import { useReactTable, getCoreRowModel, getSortedRowModel, getPaginationRowModel } from "@tanstack/react-table";

import { useState, useEffect } from "react";

//is exactly the same as FeesTable, so not sure if could reuse.
// Kept it seperate to easily customize things if needed per table
export const DexTable = ({ data, isExpanded = true, timeFrame = "total24h" }) => {
  data.forEach((item, index) => (data[index].chains = data[index].chains.toString()));

  const columnSorting = [
    {
      id: timeFrame,
      desc: true,
    },
  ];
  const [sorting, setSorting] = useState(columnSorting);
  const [columnVisibility, setColumnVisibility] = useState();

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
    data,
    state: {
      columnOrder: isExpanded
        ? ["name", "chains", "total24h", "total7d", "total30d", "totalAllTime", "change_1d"]
        : ["name", "chains", "total24h", "total7d", "total30d", "totalAllTime", "change_1d", "change_7d", "change_1m"],
      sorting,
      columnVisibility,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    disableSortRemove: true,
    getPaginationRowModel: !isExpanded ? getPaginationRowModel() : "",
  });

  return (
    <Table
      tableInstance={tableInstance}
      linkTo={"/dex"}
    />
  );
};
