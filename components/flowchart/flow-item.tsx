"use client";

import styles from "./flow-item.module.css";
import { ChartCtx, FlowItem } from "./chart-ctx";
import { useContext, MouseEvent, useState, DragEvent, useEffect } from "react";
import LineToFrom from "./lines/line-to-from";
import DragLine from "./lines/drag-line";
import { AddCtx } from "../criteria/add-process-ctx";

export default function ({
  itemType,
  label,
  desc,
  id,
  listId,
}: FlowItem): JSX.Element {
  // Import context states for flow charts
  const {
    activeData,
    changeActiveItem,
    createFlowItem,
    flowList,
    replaceFlowItem,
  } = useContext(ChartCtx);

  const {
    data: { listNo, node },
    setData: setActiveData,
  } = activeData;

  const { flowItems } = flowList[listNo];

  const {
    title: titleState,
    desc: descState,
    origin: originState,
    resetData,
  } = useContext(AddCtx);

  const [dragActive, setDragActive] = useState(false);
  const [dragCount, setDragCount] = useState(0);

  //Set item box styles based on activeItem, if activeItem === id then this item is active
  const itemBoxStyles = `${styles.item__box} ${
    node === id && listId === listNo ? styles.item__box_active : ""
  }`;

  //When item clicked, set the item as active using context imported function
  const itemClickHandler = (event: MouseEvent): void => {
    changeActiveItem(id, listId, setActiveData);
    // changeActiveItem(id, setActiveItem);
  };

  const dragEnterHandler = (event: DragEvent) => {
    event.preventDefault();

    setDragCount((prevCount: number): number => prevCount + 1);
  };

  const dragLeaveHandler = (event: DragEvent) => {
    event.preventDefault();

    setDragCount((prevCount: number): number => prevCount - 1);
  };

  const dragOverHandler = (event: DragEvent) => {
    event.preventDefault();
  };

  const dropHandler = (event: DragEvent) => {
    event.preventDefault();

    resetData();
    setDragCount(0);

    if (["end"].includes(itemType)) return;
    if (
      (originState.originListNo === listId
        ? originState.originNode === id
        : false) ||
      originState.originNode === 0 ||
      originState.originNode === flowItems.length - 1
    )
      return;

    const item: FlowItem = {
      itemType: "node",
      label: titleState.titleInput,
      desc: descState.descInput,
      id: id + 1,
      listId: listId,
      isActive: false,
    };

    if (originState.originNode > 0)
      replaceFlowItem(
        listId,
        originState.originListNo,
        originState.originNode,
        id,
        item
      );
    else createFlowItem(listId, id, item);
  };

  const dragHandler = (event: DragEvent) => event.preventDefault();
  const dragStartHandler = (event: DragEvent) => {
    originState.setOriginNode(id);
    originState.setOriginListNo(listId);

    titleState.setTitleInput(label);
    descState.setDescInput(desc);
  };
  const dragEndHandler = () => {
    originState.setOriginNode(-1);
    originState.setOriginListNo(listNo);
  };

  useEffect(() => {
    if (dragCount > 0) setDragActive(true);
    else setDragActive(false);
  }, [dragCount]);

  return (
    <div className={styles.main__container}>
      <div
        className={styles.item__container}
        onDragOver={dragOverHandler}
        onDragEnter={dragEnterHandler}
        onDragLeave={dragLeaveHandler}
        onDrop={dropHandler}
        draggable
        onDragEnd={dragEndHandler}
        onDragStart={dragStartHandler}
        onDrag={dragHandler}
      >
        <div className={styles.item__indicator_container}>
          {["start", "end"].includes(itemType) ? (
            <>
              <span
                className={`${styles.indicator__word} ${
                  node === id && listId === listNo
                    ? styles.indicator__word_active
                    : ""
                }`}
              >
                {itemType}
              </span>
              <span
                className={`${styles.indicator__box_word} ${
                  node === id && listId === listNo
                    ? styles.indicator__box_word_active
                    : ""
                }`}
              ></span>
            </>
          ) : (
            <>
              <span
                className={`${styles.indicator__num} ${
                  node === id && listId === listNo
                    ? styles.indicator__num_active
                    : ""
                }`}
              >
                {id}
              </span>
              <span
                className={`${styles.indicator__box_num} ${
                  node === id && listId === listNo
                    ? styles.indicator__box_num_active
                    : ""
                }`}
              ></span>
            </>
          )}
        </div>
        <div className={itemBoxStyles} onClick={itemClickHandler}>
          <div className={styles.item__label}>{label}</div>
          <div className={styles.item__desc}>{desc}</div>
        </div>

        {dragActive
          ? itemType !== "end" && <DragLine />
          : itemType !== "end" && (
              <LineToFrom isActive={node === id && listId === listNo} id={id} />
            )}
      </div>
    </div>
  );
}
