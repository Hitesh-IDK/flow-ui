import styles from "./add-action.module.css";
import Dropdown from "../dropdown";
import { useContext } from "react";
import { DropdownCtx, States } from "../dropdown-ctx";

export default function (): JSX.Element {
  const actionOptions = ["Place Holder 1", "Place Holder 2", "Place Holder 3"];

  const { allStates, toggleDropdown: toggleActive } = useContext(DropdownCtx);
  const dropdownStates: States = allStates[2];

  return (
    <div className={styles.action__container}>
      <label className={styles.type__name}>Transition To</label>
      <Dropdown
        name="Select an Action"
        options={actionOptions}
        state={dropdownStates}
        toggleActive={toggleActive}
      />
    </div>
  );
}
