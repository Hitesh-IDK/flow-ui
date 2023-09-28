"use client";

import styles from "./flow-chart.module.css";
import parentStyles from "../flow-container.module.css";
import FlowItemElement from "./flow-item";
import { ActiveFlow, ChartCtx, FlowInterface, FlowItem } from "./chart-ctx";
import { useContext } from "react";

export default function (): JSX.Element {
  const {
    flowList,
    activeData: {
      data: { listNo, node },
    },
  }: { flowList: FlowInterface[]; activeData: ActiveFlow } =
    useContext(ChartCtx);
  const { flowItems } = flowList[listNo];

  const flowItemElements: JSX.Element[] = flowItems.map(
    (item: FlowItem, i: number) => {
      item.id = i;
      return (
        <FlowItemElement
          itemType={item.itemType}
          label={item.label}
          desc={item.desc}
          id={item.id}
          key={i}
          isActive={item.isActive}
        ></FlowItemElement>
      );
    }
  );

  return (
    <div className={parentStyles.flow__container}>
      <div className={styles.flowchart__container}>{flowItemElements}</div>
    </div>
  );
}
