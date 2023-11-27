"use client";

import styles from "./flow-chart.module.css";
import parentStyles from "../flow-container.module.css";
import FlowItemElement from "./flow-item";
import { ActiveFlow, ChartCtx, FlowInterface, FlowItem } from "./chart-ctx";
import { useContext, useEffect, useState } from "react";
import flowItem from "./flow-item";

interface Props {
  sendFlow: CallableFunction;
}

export default function ({ sendFlow }: Props): JSX.Element {
  const {
    flowList,
    activeData: {
      data: { listNo, node },
    },
  }: { flowList: FlowInterface[]; activeData: ActiveFlow } =
    useContext(ChartCtx);
  const { flowItems: flowItems0 } = flowList[0];
  const { flowItems: flowItems1 } = flowList[1];

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (flowItems0.length !== 0) {
      setIsLoading(false);
    }
  }, [flowItems0, flowItems1]);

  const flowItemElements0: JSX.Element[] = flowItems0.map(
    (item: FlowItem, i: number) => {
      item.id = i;
      return (
        <FlowItemElement
          itemType={item.itemType}
          label={item.label}
          desc={item.desc}
          id={item.id}
          listId={0}
          key={i}
          isActive={item.isActive}
        ></FlowItemElement>
      );
    }
  );

  const flowItemElements1: JSX.Element[] = flowItems1.map(
    (item: FlowItem, i: number) => {
      item.id = i;
      return (
        <FlowItemElement
          itemType={item.itemType}
          label={item.label}
          desc={item.desc}
          id={item.id}
          listId={1}
          key={i}
          isActive={item.isActive}
        ></FlowItemElement>
      );
    }
  );

  sendFlow({ flow1: flowItems0, flow2: flowItems1 });

  return (
    <div className={parentStyles.flow__container}>
      {!isLoading ? (
        <>
          <div className={styles.flowchart__container}>{flowItemElements0}</div>
          <div className={styles.flowchart__container}>{flowItemElements1}</div>
        </>
      ) : (
        <span className={styles.loader}></span>
      )}
    </div>
  );
}
