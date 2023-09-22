import styles from "./criteria-box.module.css";
import AddCriteria from "./add-criteria";

export default function (): JSX.Element {
  return (
    <div className={styles.container__main}>
      <AddCriteria />
    </div>
  );
}
