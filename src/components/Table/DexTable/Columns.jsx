import { formatNumberToLocale } from "../../../utils/helpers";
import { LogoName } from "../LogoName";
import { Logos } from "../../Logos";

export const getColumns = (isExpanded) => {
  return [
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
      size: 150,
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
      header: isExpanded ? "24h" : "Volume",
      accessorKey: "total24h",
      cell: ({ getValue }) => {
        return getValue() ? formatNumberToLocale(getValue()) : "-";
      },
      size: 150,
    },
    {
      header: isExpanded ? "7d" : "Volume",
      accessorKey: "total7d",
      cell: ({ getValue }) => (getValue() ? formatNumberToLocale(getValue()) : "-"),
      size: 150,
    },
    {
      header: isExpanded ? "30d" : "Volume",
      accessorKey: "total30d",
      cell: ({ getValue }) => (getValue() ? formatNumberToLocale(getValue()) : "-"),
      size: 150,
    },
    {
      header: isExpanded ? "All time" : "Volume",
      accessorKey: "totalAllTime",
      cell: ({ getValue }) => (getValue() ? formatNumberToLocale(getValue()) : "-"),
      size: 150,
    },
  ];
};
