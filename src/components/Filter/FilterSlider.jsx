import styles from "./Filter.module.scss";
import { Popover, PopoverDisclosure, usePopoverState } from "ariakit/popover";
import { HiOutlineViewColumns } from "react-icons/hi2";

import Slider from "./Slider";

const FilterSlider = ({ column }) => {
  const popover = usePopoverState();
  return (
    <>
      <PopoverDisclosure
        className={styles.filterBtn}
        state={popover}>
        {column.columnDef.header}
        <HiOutlineViewColumns className={styles.icons} />
      </PopoverDisclosure>
      <Popover
        state={popover}
        className={styles.popover}>
        <Slider
          min={Number(column.getFacetedMinMaxValues()?.[0] ?? "")}
          max={Number(column.getFacetedMinMaxValues()?.[1] ?? "")}
        />
      </Popover>
    </>
  );
};

// const DisclosureItem = ({ column, type }) => {
//   const disclosure = useDisclosureState();
//   console.log(type);

//   return (
//     <li key={column.id}>
//       <Slider
//         min={Number(column.getFacetedMinMaxValues()?.[0] ?? "")}
//         max={Number(column.getFacetedMinMaxValues()?.[1] ?? "")}
//       />
//     </li>
//   );
// };

export default FilterSlider;
