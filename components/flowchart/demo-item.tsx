import React from "react";
import styles from "./demo-item.module.css";

export default function (): React.JSX.Element {
  return (
    <div className={styles.item__box}>
      <div className={styles.item__label}>TITLE</div>
      <div className={styles.item__desc}>DESCRIPTION</div>
    </div>
  );
}
