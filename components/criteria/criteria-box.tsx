import Dropdown from "../dropdown";
import styles from "./criteria-box.module.css";

export default function () {
  const fieldOptions: string[] = [
    "Technical Staff",
    "Marketing Staff",
    "Service Staff",
  ];
  const comparisionOptions: string[] = ["Achieved", "Refused", "Pending"];

  //TODO FIX THIS
  const checkActive = (isActive: boolean) => {
    if (isActive) {
    }
  };

  return (
    <div className={styles.container__main}>
      <div className={styles.criteria__field}>
        <label className={styles.field__name}>Field</label>
        <Dropdown
          name="Field"
          options={fieldOptions}
          checkActive={checkActive}
        />
        <label className={styles.field__name}>Comparision</label>
        <Dropdown
          name="Comparision"
          options={comparisionOptions}
          checkActive={checkActive}
        />
      </div>
    </div>
  );
}
