"use client";

import { DropdownProvider } from "./dropdown-ctx";
import styles from "./flow-container.module.css";
import FlowCriteria from "./criteria/flow-criteria";
import FlowChart from "./flowchart/flow-chart";
import ChartCtxProvider, { FlowItem } from "./flowchart/chart-ctx";
import ModalCtx from "./modal-ctx";
import AddCtxProvider from "./criteria/add-process-ctx";

export default function FlowContainer(): JSX.Element {
  let flows = {};

  const getFlows = (newFlows: { flow1: FlowItem; flow2: FlowItem }) => {
    flows = newFlows;
  };

  const save_handler = async () => {
    const response = await fetch("http://localhost:3000/api/flow", {
      method: "POST",
      body: JSON.stringify(flows),
      headers: {
        "Content-type": "application/json",
      },
    });

    console.log(response.body);
  };

  return (
    <DropdownProvider>
      <ChartCtxProvider>
        <AddCtxProvider>
          <div className={styles.container__top}>
            <div className={styles.container__main}>
              <div className={styles.header__container}>
                <header className={styles.header}>Flow Header</header>
                <button className={styles.btn__save} onClick={save_handler}>
                  Save
                </button>
              </div>
              <ModalCtx>
                <FlowChart sendFlow={getFlows} />
              </ModalCtx>
              <FlowCriteria />
            </div>
          </div>
        </AddCtxProvider>
      </ChartCtxProvider>
    </DropdownProvider>
  );
}
