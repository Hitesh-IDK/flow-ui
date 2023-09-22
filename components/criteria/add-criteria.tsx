import styles from "./add-criteria.module.css";
import { useEffect, useState, Dispatch, Context, useContext } from "react";
import Dropdown from "@/components/dropdown";
import { DropdownCtx, Dropdowns } from "../dropdown-ctx";

export default function (): JSX.Element {
  //All dropdown states to track
  const { allStates: dropdownStates, toggleDropdown: toggleActive } =
    useContext(DropdownCtx);

  //Update when states change
  useEffect(() => {}, dropdownStates);

  //Options for dropdowns
  const fieldOptions: string[] = [
    "Technical Staff",
    "Marketing Staff",
    "Service Staff",
  ];
  const comparisionOptions: string[] = ["Achieved", "Refused", "Pending"];

  return (
    <div className={styles.new__container}>
      <div className={styles.criteria__type}>
        <label className={styles.type__name}>Field</label>
        <Dropdown
          name="Select a Field"
          options={fieldOptions}
          state={dropdownStates[0]}
          toggleActive={toggleActive}
        />
        <label className={styles.type__name}>Comparision</label>
        <Dropdown
          name="Select a Comparision"
          options={comparisionOptions}
          state={dropdownStates[1]}
          toggleActive={toggleActive}
        />
      </div>
      <button className={styles.btn__new}> Add New Criteria </button>
    </div>
  );
}
