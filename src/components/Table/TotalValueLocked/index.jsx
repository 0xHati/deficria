import {
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getPaginationRowModel,
} from "@tanstack/react-table";
import { useState, useEffect } from "react";
import { Table } from "..";
import columns from "./columns.jsx";
import defillama from "defillama-api";
import { useQuery } from "react-query";
import Filter from "../../Filter";

import { fetchData } from "../../../utils/helpers";

const TotalValueLockedTable = ({ isExpanded = true }) => {
  const { data } = useQuery(["TVL"], () => fetchData(defillama.tvl.protocols()));

  data.forEach((item, index) => (data[index].chains = data[index].chains.toString()));

  const columnSorting = [
    {
      id: "tvl",
      desc: true,
    },
  ];

  const inititalColumnOrder = ["name", "category", "chains", "tvl", "change_1h", "change_1d", "change_7d"];

  const [sorting, setSorting] = useState(columnSorting);
  const [columnFilters, setColumnFilters] = useState([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [columnVisibility, setColumnVisibility] = useState();
  const [columnOrder, setColumnOrder] = useState(inititalColumnOrder);

  useEffect(() => {
    setSorting(columnSorting);
    setColumnVisibility(!isExpanded ? { change_1h: false, change_1d: true, change_7d: false, chains: false } : {});
  }, []);

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
      columnOrder,
      sorting,
      globalFilter,
      columnFilters,
      columnVisibility,
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
    getPaginationRowModel: !isExpanded ? getPaginationRowModel() : "",
    onColumnVisibilityChange: setColumnVisibility,
    onColumnOrderChange: setColumnOrder,
  });

  //

  return (
    <>
      {isExpanded && <Filter table={tableInstance} />}
      <Table
        tableInstance={tableInstance}
        linkTo={"/tvl"}
      />
    </>
  );
};

export default TotalValueLockedTable;
