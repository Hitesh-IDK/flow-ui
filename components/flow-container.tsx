import styles from "./flow-container.module.css";
import FlowCriteria from "./flow-criteria";

export default function FlowContainer(): JSX.Element {
  return (
    <div className={styles.container__top}>
      <div className={styles.container__main}>
        <header className={styles.header}>Flow Header</header>
        <section className={styles.flow__container}>a</section>
        <FlowCriteria />
      </div>
    </div>
  );
}
