import { Checkbox, CheckboxCheck } from "ariakit/checkbox";
import { HiOutlineViewColumns } from "react-icons/hi2";
import { Group } from "ariakit";
import { useState } from "react";
import styles from "./Filter.module.scss";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

import { MdOutlineDragIndicator } from "react-icons/md";

import { VisuallyHidden } from "ariakit/visually-hidden";

const FilterColumnsControl = ({ table }) => {
  const [focusVisible, setFocusVisible] = useState(false);
  console.log(table.getState().columnOrder);

  const handleOnDragEnd = (result) => {
    console.log(result);
    console.log(table.getState().columnOrder);

    const items = [...table.getState().columnOrder];
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    console.log(items);
    // console.log(table.getState());

    table.setColumnOrder(items);
    // console.log(table.getState().columnOrder);
  };

  return (
    <>
      <button className={styles.filterBtn}>
        <HiOutlineViewColumns className={styles.icons} />
        Columns
      </button>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="columns">
          {(provided) => (
            <ul
              className={styles.columns}
              {...provided.droppableProps}
              ref={provided.innerRef}>
              {table.getState().columnOrder.map((item, index) => {
                const column = table.getColumn(item);
                return (
                  <Draggable
                    key={column.id}
                    draggableId={column.id}
                    index={index}>
                    {(provided) => (
                      <li
                        className={styles["columns__column"]}
                        ref={provided.innerRef}
                        {...provided.draggableProps}>
                        <VisuallyHidden>
                          <Checkbox
                            value={column.id}
                            onFocusVisible={() => setFocusVisible(true)}
                            onBlur={() => setFocusVisible(false)}
                            checked={column.getIsVisible()}
                          />
                        </VisuallyHidden>
                        <div
                          className={styles["columns__checkbox-container"]}
                          checked={column.getIsVisible()}
                          data-focus-visible={focusVisible ? "" : null}
                          onClick={(e) => column.toggleVisibility(!e.target.checked)}>
                          <CheckboxCheck
                            checked={column.getIsVisible()}
                            className={styles["columns__checkbox"]}
                          />
                          <span>{column.columnDef.header}</span>
                        </div>
                        <span
                          className={styles["columns__drag"]}
                          {...provided.dragHandleProps}>
                          <MdOutlineDragIndicator className={styles.icons} />
                        </span>
                      </li>
                    )}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    </>
  );
};

export default FilterColumnsControl;
