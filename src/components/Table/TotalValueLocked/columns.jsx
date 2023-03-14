import { LogoName } from "../LogoName";
import { formatNumberToLocale } from "../../../utils/helpers";
import { Logos } from "../../Logos";

export const columns = [
  {
    header: "Name",
    accessorKey: "name",
    cell: ({ getValue, row, table }) => {
      const logo = row.original.logo;
      const value = getValue();
      const index = table.getSortedRowModel().rows.findIndex((x) => x.id === row.id) + 1;

      return (
        <>
          <LogoName
            logoSrc={logo}
            value={value}
            rank={index}
          />
        </>
      );
    },
    size: 150,
  },
  {
    header: "Category",
    accessorKey: "category",
    size: 100,
  },
  {
    header: "Chains",
    accessorKey: "chains",
    size: 150,
    cell: ({ getValue }) => {
      const chains = getValue();
      return <Logos protocolNames={chains.split(",")} />;
    },
    meta: {
      align: "left",
    },
  },
  {
    header: "TVL",
    accessorKey: "tvl",
    size: 100,
    cell: ({ getValue }) => {
      return getValue() ? formatNumberToLocale(getValue()) : "-";
    },
  },
  {
    header: "1h change",
    accessorKey: "change_1h",
    size: 100,
    cell: ({ getValue }) => (getValue() ? getValue().toFixed(2) + "%" : "-"),
    meta: {
      color: true,
    },
  },
  {
    header: "1d change",
    accessorKey: "change_1d",
    size: 100,
    cell: ({ getValue }) => (getValue() ? getValue().toFixed(2) + "%" : "-"),
    meta: {
      color: true,
    },
  },
  {
    header: "7d change",
    accessorKey: "change_7d",
    size: 100,
    cell: ({ getValue }) => (getValue() ? getValue().toFixed(2) + "%" : "-"),
    meta: {
      color: true,
    },
  },
];
