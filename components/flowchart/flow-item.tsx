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
  console.log(indicatorTextStyles, activeItem === id);

  const itemClickHandler = (event: MouseEvent): void => {
    changeActiveItem(id, setActiveItem);
  };

  return (
    <div className={styles.item__container}>
      <div className={styles.item__indicator_container}>
        <span className={indicatorStyles}></span>
        <span className={indicatorTextStyles}>
          {["start", "end"].includes(itemType)
            ? `${itemType.slice(0, 1).toUpperCase()}${itemType.slice(1)}`
            : `${id}`}
        </span>
      </div>
      <div className={itemBoxStyles} onClick={itemClickHandler}>
        <div className={styles.item__label}>{label}</div>
        <div className={styles.item__desc}>{desc}</div>
      </div>
    </div>
  );
}
