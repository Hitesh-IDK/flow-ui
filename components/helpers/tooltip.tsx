"use client";

import styles from "./tooltip.module.css";
import { useState } from "react";

type Props = {
  children: any;
  content: String;
};

export default function (props: Props) {
  const [isActive, toggleActive] = useState(false);

  const toggleTooltip = () => {
    if (isActive) toggleActive(false);
    else toggleActive(true);
  };

  return (
    <div
      onMouseEnter={toggleTooltip}
      onMouseLeave={toggleTooltip}
      className={styles.tooltip}
    >
      {props.children}
      {isActive && (
        <div className={styles.tooltip__content}>{props.content}</div>
      )}
    </div>
  );
}
