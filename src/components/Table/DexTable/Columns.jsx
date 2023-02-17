import { SortedHeader } from "../HeaderSort";
import styles from "../Table.module.css";
import { formatNumberToLocale } from "../../../utils/helpers";

export const dexColumns = [
  {
    Header: (table) => {
      return <SortedHeader headerName="Name" isSorted={table.column.isSortedDesc} />;
    },

    accessor: "name",
    Cell: ({ value, row, data }) => {
      const logo = data[row.index].logo;

      return (
        <span className={styles.info}>
          <img src={logo} alt={value + " image"} className={styles.logo} />
          <span>{value}</span>
        </span>
      );
    },
  },
  {
    Header: (table) => {
      return <SortedHeader headerName="1d change" isSorted={table.column.isSortedDesc} />;
    },
    accessor: "change_1d",
    Cell: ({ value }) => (value ? value + "%" : "-"),
  },
  {
    Header: (table) => <SortedHeader headerName="7d change" isSorted={table.column.isSortedDesc} />,
    accessor: "change_7d",
    Cell: ({ value }) => (value ? value + "%" : "-"),
  },
  {
    Header: (table) => <SortedHeader headerName="1m change" isSorted={table.column.isSortedDesc} />,
    accessor: "change_1m",
    Cell: ({ value }) => (value ? value + "%" : "-"),
  },
  {
    Header: (table) => <SortedHeader headerName="24h fees" isSorted={table.column.isSortedDesc} />,
    accessor: "total24h",
    Cell: ({ value }) => (value ? formatNumberToLocale(value) : "-"),
  },
  {
    Header: (table) => <SortedHeader headerName="7d fees" isSorted={table.column.isSortedDesc} />,
    accessor: "total7d",
    Cell: ({ value }) => (value ? formatNumberToLocale(value) : "-"),
  },
  {
    Header: (table) => <SortedHeader headerName="30d fees" isSorted={table.column.isSortedDesc} />,
    accessor: "total30d",
    Cell: ({ value }) => (value ? formatNumberToLocale(value) : "-"),
  },
  {
    Header: (table) => <SortedHeader headerName="Total Fees" isSorted={table.column.isSortedDesc} />,
    accessor: "totalAllTime",
    Cell: ({ value }) => (value ? formatNumberToLocale(value) : "-"),
  },
];
