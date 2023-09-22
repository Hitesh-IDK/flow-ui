import styles from "./add-criteria.module.css";
import { useEffect, useState, Dispatch } from "react";
import Dropdown from "@/components/dropdown";

export interface Dropdowns {
  isActive: boolean;
  setIsActive: Dispatch<boolean>;
}

export default function (): JSX.Element {
  //Individual dropdown states
  const [isActive1, setIsActive1] = useState(false);
  const [isActive2, setIsActive2] = useState(false);

  //All dropdown states to track
  const dropdownStates: Dropdowns[] = [
    { isActive: isActive1, setIsActive: setIsActive1 },
    { isActive: isActive2, setIsActive: setIsActive2 },
  ];

  //Update when states change
  useEffect(() => {}, dropdownStates);

  //Options for dropdowns
  const fieldOptions: string[] = [
    "Technical Staff",
    "Marketing Staff",
    "Service Staff",
  ];
  const comparisionOptions: string[] = ["Achieved", "Refused", "Pending"];

  //Toggle dropdowns
  const toggleActive = (
    state: boolean,
    setIsActive: Dispatch<boolean>
  ): void => {
    if (state) {
      dropdownStates.forEach(({ isActive, setIsActive }) => {
        console.log(isActive, setIsActive);

        if (isActive) setIsActive(false);
      });

      setIsActive(state);
    } else setIsActive(state);
  };
  return (
    <div className={styles.new__container}>
      <div className={styles.criteria__type}>
        <label className={styles.type__name}>Field</label>
        <Dropdown
          name="Field"
          options={fieldOptions}
          state={dropdownStates[0]}
          toggleActive={toggleActive}
        />
        <label className={styles.type__name}>Comparision</label>
        <Dropdown
          name="Comparision"
          options={comparisionOptions}
          state={dropdownStates[1]}
          toggleActive={toggleActive}
        />
      </div>
      <button className={styles.btn__new}> Add New Criteria </button>
    </div>
  );
}
