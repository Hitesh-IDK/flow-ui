"use client";

import styles from "./flow-item.module.css";
import { ChartCtx, FlowItem } from "./chart-ctx";
import { useContext, MouseEvent, useEffect } from "react";
import LineToFrom from "./lines/line-to-from";

export default function ({ itemType, label, desc, id }: FlowItem): JSX.Element {
  // Import context states for flow charts
  const { activeItem, setActiveItem, changeActiveItem } = useContext(ChartCtx);

  //Set item box styles based on activeItem, if activeItem === id then this item is active
  const itemBoxStyles = `${styles.item__box} ${
    activeItem === id ? styles.item__box_active : ""
  }`;

  //When item clicked, set the item as active using context imported function
  const itemClickHandler = (event: MouseEvent): void => {
    changeActiveItem(id, setActiveItem);
  };

  return (
    <div className={styles.main__container}>
      <div className={styles.item__container}>
        <div className={styles.item__indicator_container}>
          {["start", "end"].includes(itemType) ? (
            <>
              <span
                className={`${styles.indicator__word} ${
                  activeItem === id ? styles.indicator__word_active : ""
                }`}
              >
                {itemType}
              </span>
              <span
                className={`${styles.indicator__box_word} ${
                  activeItem === id ? styles.indicator__box_word_active : ""
                }`}
              ></span>
            </>
          ) : (
            <>
              <span
                className={`${styles.indicator__num} ${
                  activeItem === id ? styles.indicator__num_active : ""
                }`}
              >
                {id}
              </span>
              <span
                className={`${styles.indicator__box_num} ${
                  activeItem === id ? styles.indicator__box_num_active : ""
                }`}
              ></span>
            </>
          )}
        </div>
        <div className={itemBoxStyles} onClick={itemClickHandler}>
          <div className={styles.item__label}>{label}</div>
          <div className={styles.item__desc}>{desc}</div>
        </div>

        {itemType !== "end" && (
          <LineToFrom isActive={activeItem === id} id={id} />
        )}
      </div>
    </div>
  );
}
