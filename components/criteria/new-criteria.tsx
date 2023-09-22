import styles from "./new-criteria.module.css";

export default function (): JSX.Element {
  return (
    <div className={styles.new__container}>
      <button className={styles.btn__new}> Add New Criteria </button>
    </div>
  );
}
