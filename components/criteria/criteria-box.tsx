import styles from "./criteria-box.module.css";
import AddCriteria from "./add-criteria";
import AddCondition from "./add-condition";

import AddAction from "./add-action";
import { DropdownProvider } from "../dropdown-ctx";
import AddProcess from "./add-process";

export default function (): JSX.Element {
  return (
    <div className={styles.container__main}>
      <AddCriteria />
      <AddCondition />
      <AddAction />
      <AddProcess />
    </div>
  );
}
