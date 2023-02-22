import { useReactTable, getCoreRowModel, getSortedRowModel, getPaginationRowModel } from "@tanstack/react-table";
import { Table } from "..";
import { useState, useEffect, Suspense } from "react";
import { getColumns } from "./Columns";

/*
The table can be expanded with all the data showing next to each other or collapsed with the option to toggle fees
*/

export const FeesTable = ({ data, isSimplyfied, timeFrame, feeStats }) => {
  useEffect(() => {
    setSorting([
      {
        id: timeFrame,
        desc: true,
      },
    ]);
    setColumnVisibility(
      isSimplyfied
        ? { change_7d: false, change_1m: false, total24h: false, total7d: false, total30d: false, totalAllTime: false, [timeFrame]: true }
        : {}
    );
  }, [timeFrame]);

  const [sorting, setSorting] = useState([
    {
      id: timeFrame,
      desc: true,
    },
  ]);
  const [columnVisibility, setColumnVisibility] = useState(
    isSimplyfied
      ? { change_7d: false, change_1m: false, total24h: false, total7d: false, total30d: false, totalAllTime: false, [timeFrame]: true }
      : {}
  );

  // since the column is not expanded all column names will be 'fees' and visibility change depending on selection

  const tableInstance = useReactTable({
    columns: getColumns(isSimplyfied),
    data,
    state: {
      columnOrder: isSimplyfied
        ? ["name", "category", "total24h", "total7d", "total30d", "change_1d"]
        : ["name", "category", "total24h", "total7d", "total30d", "totalAllTime", "change_1d", "change_7d", "change_1m"],
      sorting,
      columnVisibility,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    disableSortRemove: true,
    getPaginationRowModel: isSimplyfied ? getPaginationRowModel() : "",
  });

  return (
    <Table
      tableInstance={tableInstance}
      linkTo={"/fees"}
      feeStats={feeStats}
    />
  );
};
