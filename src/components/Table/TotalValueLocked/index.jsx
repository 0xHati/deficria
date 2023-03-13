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
import { columns } from "./columns";
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

  const [sorting, setSorting] = useState(columnSorting);
  const [columnFilters, setColumnFilters] = useState([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [columnVisibility, setColumnVisibility] = useState();

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
  });

  //

  // console.log(tableInstance);

  return (
    <>
      {isExpanded && (
        <Filter
          table={tableInstance}
          column={tableInstance.getColumn("name")}
        />
      )}
      <Table
        tableInstance={tableInstance}
        linkTo={"/tvl"}
      />
    </>
  );
};

export default TotalValueLockedTable;
