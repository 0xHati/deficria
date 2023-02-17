import { useReactTable } from "@tanstack/react-table";
import { dexColumns as columns } from "./Columns";
import { Table } from "..";

export const DexTable = ({ data }) => {
  const tableInstance = useReactTable({
    columns,
    data,
    initialState: {
      sortBy: [
        {
          id: "total24h",
          desc: true,
        },
      ],
    },
    disableSortRemove: true,
  });

  return <Table tableInstance={tableInstance} />;
};
