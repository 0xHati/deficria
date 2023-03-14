import styles from "./Filter.module.scss";

import FilterColumnsControl from "./FilterColumnsControl";
import FilterSearch from "./FilterSearch";

const Filter = ({ table }) => {
  return (
    <div className={styles.filter}>
      <FilterSearch
        filter={table.getState().globalFilter}
        setFilter={table.setGlobalFilter}
      />

      <FilterColumnsControl table={table} />
    </div>
  );
};

export default Filter;
