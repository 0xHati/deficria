import styles from "./Table.module.scss";
import { flexRender } from "@tanstack/react-table";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { slug } from "../../utils/helpers";
import { styleNumber } from "../../utils/helpers";
import { useWindowVirtualizer } from "@tanstack/react-virtual";
import { HiOutlineArrowDown, HiOutlineArrowUp } from "react-icons/hi";

export const Table = ({ tableInstance, linkTo }) => {
  const { getRowModel, getHeaderGroups } = tableInstance;

  const navigate = useNavigate();

  const { rows } = getRowModel();

  const rowVirtualizer = useWindowVirtualizer({
    count: rows.length,
    overscan: 20,
    estimateSize: () => 40,
  });

  const virtualItems = rowVirtualizer.getVirtualItems();
  const paddingTop = virtualItems.length > 0 ? virtualItems?.[0]?.start || 0 : 0;
  const paddingBottom = virtualItems.length > 0 ? rowVirtualizer.getTotalSize() - (virtualItems?.[virtualItems.length - 1]?.end || 0) : 0;

  //TODO: table can have other info and not feestats, eg tvl table
  const handleClick = (name) => {
    const nameSlug = slug(name);
    navigate(`${linkTo}/${nameSlug}`, { state: { protocol: nameSlug } });
  };

  return (
    <div className={styles["table-container"]}>
      <table>
        <thead>
          {getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                const value = flexRender(header.column.columnDef.header, header.getContext());
                const canSort = header.column.getCanSort();
                const sortDir = header.column.getIsSorted();
                console.log(header.column);

                console.log(sortDir);
                return header.isPlaceholder ? null : (
                  <th
                    key={header.id}
                    style={{ width: header.getSize(), textAlign: header.column.columnDef.meta?.align }}>
                    {header.isPlaceholder ? null : (
                      <>
                        {canSort ? (
                          <button
                            onClick={() => header.column.toggleSorting()}
                            className={styles.sortBtn}>
                            {value}
                            <span className={styles.sortIcon}>
                              {canSort && sortDir ? sortDir === "asc" ? <HiOutlineArrowUp /> : <HiOutlineArrowDown /> : null}
                            </span>
                          </button>
                        ) : (
                          value
                        )}
                      </>
                    )}
                    {/* {header.column.getCanSort() && <SortIcon dir={header.column.getIsSorted()} />}  */}
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody>
          {paddingTop > 0 && (
            <tr>
              <td style={{ height: `${paddingTop}px` }} />
            </tr>
          )}
          {rowVirtualizer.getVirtualItems().map((virtualRow) => {
            const row = rows[virtualRow.index];
            return (
              <tr
                key={row.id}
                onClick={handleClick.bind(null, row.original.name)}>
                {row.getVisibleCells().map((cell) => {
                  const meta = cell.column.columnDef?.meta;

                  return (
                    <td
                      key={cell.id}
                      className={meta?.color ? styleNumber(cell.getValue()) : ""}
                      style={{ width: cell.column.getSize() }}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  );
                })}
              </tr>
            );
          })}
          {paddingBottom > 0 && (
            <tr>
              <td style={{ height: `${paddingBottom}px` }} />
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
