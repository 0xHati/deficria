import { useReactTable, getCoreRowModel, getSortedRowModel } from "@tanstack/react-table";
import { Table } from "..";
import { useState } from "react";
import { feesColumns as columns } from "./Columns";

export const FeesTable = ({ data, isExpanded, showFees }) => {
  const [sorting, setSorting] = useState([
    {
      id: "total24h",
      desc: true,
    },
  ]);

  const tableInstance = useReactTable({
    columns,
    data,
    state: {
      columnOrder: isExpanded ? [] : ["name", "category", "total24h", "total7d", "total30d", "totalAllTime", "change_1d", "change_7d", "change_1m"],
      sorting,
      columnVisibility: isExpanded ? {} : { change_7d: false, change_1m: false, total7d: false, total30d: false, totalAllTime: false },
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),

    disableSortRemove: true,
  });

  return <Table tableInstance={tableInstance} />;
};
