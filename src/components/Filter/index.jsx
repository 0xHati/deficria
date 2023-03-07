import styles from "./Filter.module.scss";

import FilterColumnsControl from "./FilterColumnsControl";
import FilterSearch from "./FilterSearch";
import FilterSlider from "./FilterSlider";

const Filter = ({ column, table }) => {
  //   const values = useMemo(() => Array.from(column.getFacetedUniqueValues(table, "name")), [column.getFacetedUniqueValues()]);
  //   const values = Array.from(column.getFacetedUniqueValues());

  return (
    <div className={styles.filter}>
      <FilterSearch
        filter={table.getState().globalFilter}
        setFilter={table.setGlobalFilter}
      />

      {/* <FilterSlider column={table.getColumn("total24h")} /> */}

      <FilterColumnsControl table={table} />
    </div>
  );
};

export default Filter;
