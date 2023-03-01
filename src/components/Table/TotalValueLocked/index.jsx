import {
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
  getFacetedRowModel,
  getFacetedUniqueValues,
} from "@tanstack/react-table";
import { useState } from "react";
import { Table } from "..";
import Card from "../../Card";
import { columns } from "./columns";
import Filter from "../../Filter";

export const TotalValueLockedTable = ({ data }) => {
  const columnSorting = [
    {
      id: "tvl",
      desc: true,
    },
  ];

  const [sorting, setSorting] = useState(columnSorting);
  const [columnFilters, setColumnFilters] = useState([]);
  const [globalFilter, setGlobalFilter] = useState("");

  const tableInstance = useReactTable({
    columns: columns,
    data,
    globalFilterFn: (row, columnId, filterValue) => {
      const safeValue = (() => {
        const value = row.getValue(columnId);
        return typeof value === "number" ? String(value) : value;
      })();

      return safeValue?.toLowerCase().includes(filterValue.toLowerCase());
    },
    state: {
      sorting,
      globalFilter,
      columnFilters,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    disableSortRemove: true,
    onGlobalFilterChange: setGlobalFilter,
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  //

  // console.log(tableInstance);

  return (
    <Card>
      <Filter
        column={tableInstance.getColumn("category")}
        table={tableInstance}
      />

      <Table
        tableInstance={tableInstance}
        linkTo={"/tvl"}
      />
    </Card>
  );
};
