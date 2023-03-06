import styles from "./Filter.module.scss";
import { FaFilter } from "react-icons/fa";
import { IoFilter } from "react-icons/io5";
import { Combobox, ComboboxItem, ComboboxPopover, useComboboxState } from "ariakit/combobox";

import FilterColumnsControl from "./FilterColumnsControl";
import FilterSearch from "./FilterSearch";

const Filter = ({ column, table }) => {
  //   const values = useMemo(() => Array.from(column.getFacetedUniqueValues(table, "name")), [column.getFacetedUniqueValues()]);
  //   const values = Array.from(column.getFacetedUniqueValues());

  const combobox = useComboboxState({ gutter: 4, sameWidth: true });

  return (
    <div className={styles.filter}>
      {/* <button onClick={() => column.setFilterValue("Ethereum")}>Filter</button>
      <button onClick={() => column.setFilterValue("")}>Filter</button> */}
      {/* <div className={styles.search}>
       
      </div> */}
      <FilterSearch
        filter={table.getState().globalFilter}
        setFilter={table.setGlobalFilter}
      />
      <button className={styles.filterBtn}>
        <IoFilter className={styles.icons} />
        Filter
      </button>

      <FilterColumnsControl table={table} />

      {/* <Combobox
        state={combobox}
        placeholder="Filter by category"
        className="combobox"
      />
      <ComboboxPopover
        state={combobox}
        className="popover">
        <ComboboxItem
          className="combobox-item"
          value="Apple">
          <Checkbox />
          Apple
        </ComboboxItem>
        <ComboboxItem
          className="combobox-item"
          value="Apple">
          <Checkbox />
          Apple
        </ComboboxItem>
      </ComboboxPopover> */}
    </div>
  );
};

export default Filter;
