"use client";

import styles from "./dropdown.module.css";
import { useState } from "react";

type Props = {
  name: string;
  options: string[];
};

export default function (props: Props): JSX.Element {
  const [isActive, toggleActive] = useState(false);
  const [activeOption, setActiveOption] = useState(`Select a ${props.name}`);

  const changeActiveOption = (event: React.MouseEvent): void => {
    const element = event.target as HTMLElement;
    if (element.textContent) setActiveOption(element.textContent);
    if (isActive) toggleActive(false);
  };

  const optionElements: JSX.Element[] = props.options.map((option, i) => {
    return (
      <div className={option} onClick={changeActiveOption} key={i}>
        {option}
      </div>
    );
  });

  const toggleDropdown = (): void => {
    if (isActive) toggleActive(false);
    else toggleActive(true);
  };

  return (
    <div className={styles.options__container}>
      <div className={styles.options__name} onClick={toggleDropdown}>
        {activeOption}
      </div>
      {isActive && optionElements}
    </div>
  );
}
