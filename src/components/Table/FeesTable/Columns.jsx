import styles from "../Table.module.scss";
import { formatNumberToLocale } from "../../../utils/helpers";
import { LogoName } from "../LogoName";
import { TIMEFRAMES } from "../../../constants/timeframes";

export const feesColumns = [
  {
    header: "Name",
    accessorKey: "name",
    cell: ({ getValue, row }) => {
      const logo = row.original.logo;
      const value = getValue();
      return (
        <LogoName
          logoSrc={logo}
          value={value}
        />
      );
    },
  },
  {
    header: "Category",
    accessorKey: "category",
  },
  {
    header: "1d change",
    accessorKey: "change_1d",
    cell: ({ getValue }) => (getValue() ? getValue() + "%" : "-"),
    meta: {
      color: true,
    },
  },
  {
    header: "7d change",
    accessorKey: "change_7d",
    cell: ({ getValue }) => (getValue() ? getValue() + "%" : "-"),
  },
  {
    header: "1m change",
    accessorKey: "change_1m",
    cell: ({ getValue }) => (getValue() ? getValue() + "%" : "-"),
  },
  {
    header: "24h fees",
    accessorKey: "total24h",
    cell: ({ getValue }) => {
      return getValue() ? formatNumberToLocale(getValue()) : "-";
    },
  },
  {
    header: "7d fees",
    accessorKey: "total7d",
    cell: ({ getValue }) => (getValue() ? formatNumberToLocale(getValue()) : "-"),
  },
  {
    header: "30d fees",
    accessorKey: "total30d",
    cell: ({ getValue }) => (getValue() ? formatNumberToLocale(getValue()) : "-"),
  },
  {
    header: "Total Fees",
    accessorKey: "totalAllTime",
    cell: ({ getValue }) => (getValue() ? formatNumberToLocale(getValue()) : "-"),
  },
];
