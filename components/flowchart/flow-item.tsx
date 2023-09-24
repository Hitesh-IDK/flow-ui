"use client";

import styles from "./flow-item.module.css";
import { ChartCtx, FlowItem } from "./chart-ctx";
import { useContext, MouseEvent, useEffect } from "react";

export default function ({ itemType, label, desc, id }: FlowItem): JSX.Element {
  const { activeItem, setActiveItem, changeActiveItem } = useContext(ChartCtx);

  const indicatorStyles = `${styles.item__indicator} ${
    ["start", "end"].includes(itemType)
      ? `${styles.item__indicator_word} ${
          activeItem === id ? styles.item__indicator_word_active : ""
        }`
      : `${styles.item__indicator_num} ${
          activeItem === id ? styles.item__indicator_num_active : ""
        }`
  }`;

  const itemBoxStyles = `${styles.item__box} ${
    activeItem === id ? styles.item__box_active : ""
  }`;

  const indicatorTextStyles = activeItem === id ? styles.indicator__text : "";

  const itemClickHandler = (event: MouseEvent): void => {
    changeActiveItem(id, setActiveItem);
  };

  return (
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
    </div>
  );
}
