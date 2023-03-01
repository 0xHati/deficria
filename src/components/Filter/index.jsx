import { useEffect, useState } from "react";
import useDebounce from "../../hooks/useDebounce";
import styles from "./Filter.module.scss";
import { FaSearch } from "react-icons/fa";
import { Combobox, ComboboxItem, ComboboxPopover, useComboboxState } from "ariakit/combobox";
import { Checkbox } from "ariakit/checkbox";

const Filter = ({ column, table }) => {
  //   const values = useMemo(() => Array.from(column.getFacetedUniqueValues(table, "name")), [column.getFacetedUniqueValues()]);
  //   const values = Array.from(column.getFacetedUniqueValues());
  console.log(column.getFacetedUniqueValues());

  const [value, setValue] = useState(table.getState().globalFilter);
  const combobox = useComboboxState({ gutter: 4, sameWidth: true });

  const debouncedValue = useDebounce(value, 200);

  useEffect(() => {
    table.setGlobalFilter(debouncedValue);
  }, [debouncedValue]);

  const handleInputChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <div className={styles.filter}>
      {/* <button onClick={() => column.setFilterValue("Ethereum")}>Filter</button>
      <button onClick={() => column.setFilterValue("")}>Filter</button> */}
      <div className={styles.search}>
        <input
          type="search"
          value={value ?? ""}
          onChange={handleInputChange}
          className={styles["search__input"]}
          placeholder="Search..."
        />
        <FaSearch className={styles["search__icon"]} />
      </div>

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
