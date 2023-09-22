"use client";

import styles from "./dropdown.module.css";
import { useState, Dispatch } from "react";
import { Dropdowns } from "./criteria/criteria-box";

//Input props interface
interface Props {
  name: string;
  options: string[];
  state: Dropdowns;
  toggleActive(state: boolean, setState: Dispatch<boolean>): void;
}

export default function (props: Props): JSX.Element {
  //Active option state
  const [activeOption, setActiveOption] = useState(`Select a ${props.name}`);
  //is dropdown active state
  const { isActive, setIsActive }: Dropdowns = props.state;
  //toggle dropdown function
  const toggleActive = props.toggleActive;

  //Change active option based on state
  const changeActiveOption = (event: React.MouseEvent): void => {
    const element = event.target as HTMLElement;
    if (element.textContent) setActiveOption(element.textContent);
    if (isActive) toggleActive(false, setIsActive);
  };

  //Render each option dynamically
  const optionElements: JSX.Element[] = props.options.map((option, i) => {
    return (
      <div className={styles.option} onClick={changeActiveOption} key={i}>
        {option}
      </div>
    );
  });

  //To toggle dropdown
  const toggleDropdown = (): void => {
    if (isActive) toggleActive(false, setIsActive);
    else toggleActive(true, setIsActive);
  };

  return (
    <div className={styles.options__container}>
      <div className={styles.options} onClick={toggleDropdown}>
        <div className={styles.options__active}>{activeOption}</div>
        <div className={styles.options__inactive}>
          {isActive && optionElements}
        </div>
      </div>
    </div>
  );
}
