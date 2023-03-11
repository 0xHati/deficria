import { formatNumberToLocale } from "../../../utils/helpers";
import Sparkline from "../../Chart/Fees/Sparkline";
import { LogoName } from "../LogoName";

export const getColumns = (isExpanded) => {
  return [
    {
      header: "Name",
      accessorKey: "name",
      cell: ({ getValue, row, table }) => {
        const logo = row.original.logo;
        const value = getValue();
        const index = table.getSortedRowModel().rows.findIndex((x) => x.id === row.id) + 1;

        return (
          <LogoName
            logoSrc={logo}
            value={value}
            rank={index}
          />
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
      header: "1d change",
      accessorKey: "change_1d",
      cell: ({ getValue }) => (getValue() ? getValue() + "%" : "-"),
      meta: {
        color: true,
      },
      size: 100,
    },
    {
      header: "7d change",
      accessorKey: "change_7d",
      cell: ({ getValue }) => (getValue() ? getValue() + "%" : "-"),
      meta: {
        color: true,
      },
      size: 100,
    },
    {
      header: "1m change",
      accessorKey: "change_1m",
      cell: ({ getValue }) => (getValue() ? getValue() + "%" : "-"),
      meta: {
        color: true,
      },
      size: 100,
    },
    {
      header: isExpanded ? "24h fees" : "Fees",
      accessorKey: "total24h",
      cell: ({ getValue }) => {
        return getValue() ? formatNumberToLocale(getValue()) : "-";
      },
      size: 150,
    },
    {
      header: isExpanded ? "7d fees" : "Fees",
      accessorKey: "total7d",
      cell: ({ getValue }) => (getValue() ? formatNumberToLocale(getValue()) : "-"),
      size: 150,
    },
    {
      header: isExpanded ? "30d fees" : "Fees",
      accessorKey: "total30d",
      cell: ({ getValue }) => (getValue() ? formatNumberToLocale(getValue()) : "-"),
      size: 150,
    },
    {
      header: isExpanded ? "Total Fees" : "Fees",
      accessorKey: "totalAllTime",
      cell: ({ getValue }) => (getValue() ? formatNumberToLocale(getValue()) : "-"),
      size: 150,
    },
    {
      header: "Trend",
      accessorKey: "sparkline",
      cell: ({ getValue }) => (
        <Sparkline
          data={getValue()}
          margin={{ marginLeft: "auto" }}
        />
      ),
      size: 150,
    },
  ];
};
