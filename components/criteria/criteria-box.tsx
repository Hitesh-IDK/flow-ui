import Dropdown from "../dropdown";
import styles from "./criteria-box.module.css";

export default function () {
  const fieldOptions: string[] = [
    "Technical Staff",
    "Marketing Staff",
    "Service Staff",
  ];
  const comparision: string[] = ["Achieved", "Refused", "Pending"];
  return (
    <div className={styles.container__main}>
      <div className={styles.criteria__field}>
        <label>Field</label>
        <Dropdown name="Field" options={fieldOptions} />
      </div>
    </div>
  );
}
