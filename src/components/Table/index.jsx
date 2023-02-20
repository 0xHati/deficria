import styles from "./Table.module.scss";
import { flexRender } from "@tanstack/react-table";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export const Table = ({ tableInstance, linkTo }) => {
  const { getRowModel, getHeaderGroups } = tableInstance;
  const navigate = useNavigate();

  const handleClick = (name) => {
    navigate(`${linkTo}/${name}`);
  };

  return (
    <div className={styles["table-container"]}>
      <table>
        <thead>
          {getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                const value = flexRender(header.column.columnDef.header, header.getContext());
                return (
                  <th key={header.id}>
                    {header.isPlaceholder ? null : (
                      <>
                        {header.column.getCanSort() ? (
                          <button
                            onClick={() => header.column.toggleSorting()}
                            style={{ cursor: "pointer" }}>
                            {value}
                          </button>
                        ) : (
                          value
                        )}
                      </>
                    )}
                    {/* {header.column.getCanSort() && <SortIcon dir={header.column.getIsSorted()} />} */}
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody>
          {getRowModel().rows.map((row) => (
            <tr
              key={row.id}
              onClick={handleClick.bind(null, row.original.name)}>
              {row.getVisibleCells().map((cell) => {
                const meta = cell.column.columnDef?.meta;

                return (
                  <td
                    key={cell.id}
                    className={meta?.color ? styleNumber(cell.getValue()) : ""}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const styleNumber = (value) => {
  if (value > 0) return styles.positive;
  if (value < 0) return styles.negative;
  else return "";
};
