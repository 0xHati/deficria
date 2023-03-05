import { useReactTable, getCoreRowModel, getSortedRowModel, getPaginationRowModel } from "@tanstack/react-table";
import { Table } from "..";
import { useState, useEffect } from "react";
import { getColumns } from "./columns";
import Filter from "../../Filter";

/*
The table can be expanded with all the data showing next to each other or collapsed with the option to toggle fees
*/

export const FeesTable = ({ data, isExpanded = true, timeFrame = "total24h" }) => {
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
      columnOrder,
      sorting,
      columnVisibility,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    disableSortRemove: true,
    getPaginationRowModel: !isExpanded ? getPaginationRowModel() : "",
    onColumnVisibilityChange: setColumnVisibility,
    onColumnOrderChange: setColumnOrder,
  });

  return (
    <>
      <Table
        tableInstance={tableInstance}
        linkTo={"/fees"}
      />
    </>
  );
};
