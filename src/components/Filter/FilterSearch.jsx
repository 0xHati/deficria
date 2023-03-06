import { FaSearch } from "react-icons/fa";
import styles from "./Filter.module.scss";
import useDebounce from "../../hooks/useDebounce";
import { useEffect, useState } from "react";

const FilterSearch = ({ filter, setFilter }) => {
  const [value, setValue] = useState(filter);

  const debouncedValue = useDebounce(value, 200);
  useEffect(() => {
    setFilter(String(debouncedValue));
  }, [debouncedValue]);

  return (
    <div className={styles.search}>
      <input
        type="search"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className={styles["search__input"]}
        placeholder="Search..."
      />
      <button className={styles.searchBtn}>
        <FaSearch className={styles.icons} />
      </button>
    </div>
  );
};

export default FilterSearch;
