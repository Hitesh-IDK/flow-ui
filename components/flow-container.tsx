import { DropdownProvider } from "./dropdown-ctx";
import styles from "./flow-container.module.css";
import FlowCriteria from "./criteria/flow-criteria";
import FlowChart from "./flowchart/flow-chart";
import ChartCtxProvider from "./flowchart/chart-ctx";
import ModalCtx from "./modal-ctx";
import AddCtxProvider from "./criteria/add-process-ctx";

export default function FlowContainer(): JSX.Element {
  return (
    <DropdownProvider>
      <ChartCtxProvider>
        <AddCtxProvider>
          <div className={styles.container__top}>
            <div className={styles.container__main}>
              <header className={styles.header}>Flow Header</header>
              <ModalCtx>
                <FlowChart />
              </ModalCtx>
              <FlowCriteria />
            </div>
          </div>
        </AddCtxProvider>
      </ChartCtxProvider>
    </DropdownProvider>
  );
}
