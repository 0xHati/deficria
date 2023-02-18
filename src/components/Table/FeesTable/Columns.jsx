import styles from "../Table.module.scss";
import { formatNumberToLocale } from "../../../utils/helpers";
import { SortedHeader } from "../HeaderSort";

export const feesColumns = [
  {
    header: "Name",
    accessorKey: "name",
    cell: ({ getValue, row }) => {
      const logo = row.original.logo;

      return (
        <span className={styles.info}>
          <img
            src={logo}
            alt={getValue() + " image"}
            className={styles.logo}
          />
          <span>{getValue()}</span>
        </span>
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
