"use client";

import { DropdownCtx, States } from "../dropdown-ctx";
import styles from "./dropdown.module.css";
import { useState, Dispatch, useContext } from "react";
import expandMore from "@/public/icons/expand_more.svg";
import expandLess from "@/public/icons/expand_less.svg";
import Image from "next/image";

//Input props interface
interface Props {
  name: string;
  options: string[];
  state: States;
  toggleActive(
    state: boolean,
    setIsActive: Dispatch<boolean>,
    allStates: States[]
  ): void;
}

export default function (props: Props): JSX.Element {
  //Active option state
  const [activeOption, setActiveOption] = useState(`${props.name}`);
  //is dropdown active state
  const { isActive, setIsActive }: States = props.state;
  //toggle dropdown function
  const toggleActive = props.toggleActive;
  const { allStates } = useContext(DropdownCtx);

  //Change active option based on state
  const changeActiveOption = (event: React.MouseEvent): void => {
    const element = event.target as HTMLElement;
    if (element.textContent) setActiveOption(element.textContent);
    if (isActive) toggleActive(false, setIsActive, allStates);
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
    if (isActive) toggleActive(false, setIsActive, allStates);
    else toggleActive(true, setIsActive, allStates);
  };

  return (
    <div className={styles.options__container}>
      <div className={styles.options} onClick={toggleDropdown}>
        <div className={styles.options__active}>
          {activeOption}
          <span>
            <Image
              src={isActive ? expandLess : expandMore}
              alt="expand and condense"
            />
          </span>
        </div>
        <div className={styles.options__inactive}>
          {isActive && optionElements}
        </div>
      </div>
    </div>
  );
}
