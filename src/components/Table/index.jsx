import styles from "./Table.module.scss";
import { flexRender } from "@tanstack/react-table";

export const Table = ({ tableInstance }) => {
  const { getRowModel, getHeaderGroups } = tableInstance;

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
            <tr key={row.id}>
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
