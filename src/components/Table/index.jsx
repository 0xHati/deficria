import styles from "./Table.module.css";
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
                      <>{header.column.getCanSort() ? <button onClick={() => header.column.toggleSorting()}>{value}</button> : value}</>
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
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
