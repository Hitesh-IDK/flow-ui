"use client";

import {
  Context,
  Dispatch,
  MouseEvent,
  PropsWithChildren,
  createContext,
  useState,
} from "react";

export interface FlowItem {
  itemType: "start" | "end" | "node" | string;
  label: string;
  desc: string;
  id: number;
  isActive: boolean;
}

const demoFlowItem: FlowItem = {
  itemType: "node",
  label: "",
  desc: "",
  id: 0,
  isActive: false,
};
const demoSetFlowItems: Dispatch<FlowItem[]> =
  "placeHolder" as unknown as Dispatch<FlowItem[]>;

const demoSetActiveItem: Dispatch<number> =
  "placeHolder" as unknown as Dispatch<number>;

const changeActiveItem = (
  id: number,
  setActiveItem: Dispatch<number>
): void => {
  setActiveItem(id);
};

export interface ContextValue {
  flowItems: FlowItem[];
  setFlowItems: Dispatch<FlowItem[]>;
  activeItem: number;
  setActiveItem: Dispatch<number>;
  changeActiveItem(id: number, setActiveItem: Dispatch<number>): void;
}

export const ChartCtx: Context<ContextValue> = createContext({
  flowItems: [demoFlowItem],
  setFlowItems: demoSetFlowItems,
  activeItem: 0,
  setActiveItem: demoSetActiveItem,
  changeActiveItem,
});

export default function (props: PropsWithChildren): JSX.Element {
  const [flowItems, setFlowItems] = useState<FlowItem[]>([
    {
      itemType: "start",
      label: "Start of a Request",
      desc: "Info: Starting a request now",
      id: 0,
      isActive: false,
    },
    {
      itemType: "node",
      label: "New Request",
      desc: "Info: Request Service",
      id: 0,
      isActive: false,
    },
    {
      itemType: "node",
      label: "New Request",
      desc: "Info: Request Service",
      id: 0,
      isActive: false,
    },
    {
      itemType: "end",
      label: "End of a request",
      desc: "Info: Request Service has been ended",
      id: 0,
      isActive: false,
    },
  ]);

  const [activeItem, setActiveItem]: [number, Dispatch<number>] = useState(0);

  return (
    <ChartCtx.Provider
      value={{
        flowItems,
        setFlowItems,
        activeItem,
        setActiveItem,
        changeActiveItem,
      }}
    >
      {props.children}
    </ChartCtx.Provider>
  );
}
