import { useReactTable, getCoreRowModel, getSortedRowModel, getPaginationRowModel } from "@tanstack/react-table";
import { Table } from "..";
import { useState, useEffect, Suspense } from "react";
import { feesColumns as columns } from "./Columns";

/*
The table can be expanded with all the data showing next to each other or collapsed with the option to toggle fees
*/
const updateHeaders = () => {
  const accessors = ["total24h", "total7d", "total30d", "totalAllTime"];

  columns.forEach((column) => {
    if (accessors.includes(column.accessorKey)) {
      column.header = "Fees";
    }
  });
};

export const FeesTable = ({ data, isExpanded, timeFrame, feeStats }) => {
  const [sorting, setSorting] = useState();
  const [columnVisibility, setColumnVisibility] = useState();

  useEffect(() => {
    setSorting([
      {
        id: timeFrame,
        desc: true,
      },
    ]);
    setColumnVisibility(
      isExpanded
        ? {}
        : { change_7d: false, change_1m: false, total24h: false, total7d: false, total30d: false, totalAllTime: false, [timeFrame]: true }
    );
  }, [timeFrame]);

  // since the column is not expanded all column names will be 'fees' and visibility change depending on selection
  if (!isExpanded) {
    updateHeaders();
  }

  const tableInstance = useReactTable({
    columns,
    data,

    state: {
      columnOrder: isExpanded ? [] : ["name", "category", "total24h", "total7d", "total30d", "totalAllTime", "change_1d", "change_7d", "change_1m"],
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
    <Suspense fallback={<div>Loading...</div>}>
      <Table
        tableInstance={tableInstance}
        linkTo={"/fees"}
        feeStats={feeStats}
      />
    </Suspense>
  );
};
