"use client";

import {
  Context,
  Dispatch,
  PropsWithChildren,
  createContext,
  useEffect,
  useState,
} from "react";

export interface FlowItem {
  itemType: "start" | "end" | "node" | string;
  label: string;
  desc: string;
  id: number;
  listId: number;
  isActive: boolean;
}

export interface FlowInterface {
  flowItems: FlowItem[];
  setFlowItems: Dispatch<FlowItem[]>;
}

export interface ActiveData {
  listNo: number;
  node: number;
}
export interface ActiveFlow {
  data: ActiveData;
  setData: Dispatch<ActiveData>;
}

const demoFlowItem: FlowItem = {
  itemType: "node",
  label: "",
  desc: "",
  id: 0,
  listId: 0,
  isActive: false,
};
const demoSetFlowItems: Dispatch<FlowItem[]> =
  "placeHolder" as unknown as Dispatch<FlowItem[]>;

const demoSetActiveData: Dispatch<ActiveData> =
  "placeHolder" as unknown as Dispatch<ActiveData>;

const defaultFlowItem: FlowItem = {
  itemType: "node",
  label: "New Request",
  desc: "Field: Set Service",
  id: 0,
  listId: 0,
  isActive: false,
};

const changeActiveItem = (
  id: number,
  listNo: number,
  setActiveData: Dispatch<ActiveData>
): void => {
  setActiveData({ listNo, node: id });
};

export interface ContextValue {
  flowList: FlowInterface[];
  activeData: ActiveFlow;
  changeActiveItem(
    id: number,
    listNo: number,
    setActiveItem: Dispatch<ActiveData>
  ): void;
  createFlowItem(listNo: number, afterId: number, item?: FlowItem): void;
  deleteFlowItem(listNo: number, id: number): void;
  replaceFlowItem(
    listNo: number,
    fromListNo: number,
    id: number,
    afterId: number,
    item: FlowItem
  ): void;
}

export const ChartCtx: Context<ContextValue> = createContext({
  flowList: [{ flowItems: [demoFlowItem], setFlowItems: demoSetFlowItems }],
  activeData: { data: { listNo: 0, node: -1 }, setData: demoSetActiveData },
  changeActiveItem,
  createFlowItem: function (
    listNo: number,
    afterId: number,
    item?: FlowItem
  ) {},
  deleteFlowItem: function (listNo: number, id: number) {},
  replaceFlowItem: function (
    listNo: number,
    fromListNo: number,
    id: number,
    afterId: number,
    item: FlowItem
  ) {},
});

export default function (props: PropsWithChildren): JSX.Element {
  const [flowItems1, setFlowItems1] = useState<FlowItem[]>([
    // {
    //   itemType: "start",
    //   label: "Start of a Request",
    //   desc: "Info: Starting a request now",
    //   id: 0,
    //   listId: 0,
    //   isActive: false,
    // },
    // {
    //   itemType: "node",
    //   label: "New Request 1",
    //   desc: "Info: Request Service",
    //   id: 0,
    //   listId: 0,
    //   isActive: false,
    // },
    // {
    //   itemType: "node",
    //   label: "New Request 2",
    //   desc: "Info: Request Service",
    //   id: 0,
    //   listId: 0,
    //   isActive: false,
    // },
    // {
    //   itemType: "node",
    //   label: "New Request 3",
    //   desc: "Info: Request Service",
    //   id: 0,
    //   listId: 0,
    //   isActive: false,
    // },
    // {
    //   itemType: "end",
    //   label: "End of a request",
    //   desc: "Info: Request Service has been ended",
    //   id: 0,
    //   listId: 0,
    //   isActive: false,
    // },
  ]);

  const [flowItems2, setFlowItems2] = useState<FlowItem[]>([
    // {
    //   itemType: "start",
    //   label: "Start of a Request",
    //   desc: "Info: Starting a request now",
    //   id: 0,
    //   listId: 0,
    //   isActive: false,
    // },
    // {
    //   itemType: "node",
    //   label: "New Request 1",
    //   desc: "Info: Request Service",
    //   id: 0,
    //   listId: 0,
    //   isActive: false,
    // },
    // {
    //   itemType: "node",
    //   label: "New Request 2",
    //   desc: "Info: Request Service",
    //   id: 0,
    //   listId: 0,
    //   isActive: false,
    // },
    // {
    //   itemType: "end",
    //   label: "End of a request",
    //   desc: "Info: Request Service has been ended",
    //   id: 0,
    //   listId: 0,
    //   isActive: false,
    // },
  ]);

  const getFlowItems = async () => {
    const response = await fetch(`http://localhost:3000/api/flow`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    });

    const resData = await response.json();

    return resData;
  };

  useEffect(() => {
    console.log("Running effect");

    const flowsFromServer = getFlowItems().then((data) => {
      setTimeout(() => {
        setFlowItems1(data.flows1);
        setFlowItems2(data.flows2);
      }, 1000);
    });
  }, []);

  const [activeItem, setActiveItem] = useState<ActiveData>({
    listNo: 0,
    node: -1,
  });

  useEffect(() => {}, [activeItem, flowItems1, flowItems2]);

  const activeData: ActiveFlow = {
    data: activeItem,
    setData: setActiveItem,
  };

  const flowList = [
    {
      flowItems: flowItems1,
      setFlowItems: setFlowItems1,
    },
    {
      flowItems: flowItems2,
      setFlowItems: setFlowItems2,
    },
  ];

  const createFlowItem = (
    listNo: number,
    afterId: number,
    item: FlowItem = defaultFlowItem
  ): void => {
    const { flowItems, setFlowItems } = flowList[listNo];
    item.desc = `Info: ${item.desc}`;

    const newFlowItems: FlowItem[] = [];

    for (let i = 0; i < flowItems.length; i++) {
      if (afterId + 1 === flowItems[i].id) newFlowItems.push(item);
      newFlowItems.push(flowItems[i]);
    }

    setFlowItems(newFlowItems);
  };

  const deleteFlowItem = (listNo: number, id: number) => {
    console.log(listNo, id);

    const { flowItems, setFlowItems } = flowList[listNo];

    if (id === 0 || id === flowItems.length - 1 || activeItem.node === -1)
      return;

    setFlowItems((prevFlowItems) => {
      const newFlowItems: FlowItem[] = prevFlowItems.filter(
        (item) => item.id !== id
      );

      return newFlowItems;
    });
  };

  const replaceFlowItem = (
    listNo: number,
    fromListNo: number,
    id: number,
    afterId: number,
    item: FlowItem
  ) => {
    console.log("Replace requested!");

    if (fromListNo === listNo) {
      const { flowItems, setFlowItems } = flowList[listNo];

      const newFlowItems: FlowItem[] = [];

      for (let i = 0; i < flowItems.length; i++) {
        if (flowItems[i].id === afterId + 1) newFlowItems.push(item);
        if (flowItems[i].id === id) continue;
        newFlowItems.push(flowItems[i]);
      }

      setFlowItems(newFlowItems);
    }

    if (listNo !== fromListNo) {
      console.log("Cross List");

      const { flowItems: fromFlowItems, setFlowItems: fromSetFlowItems } =
        flowList[fromListNo];
      const { flowItems: toFlowItems, setFlowItems: toSetFlowItems } =
        flowList[listNo];

      const newFromFlowItems: FlowItem[] = [];
      const newToFlowItems: FlowItem[] = [];

      for (let i = 0; i < fromFlowItems.length; i++) {
        if (fromFlowItems[i].id === id) continue;
        newFromFlowItems.push(fromFlowItems[i]);
      }

      for (let i = 0; i < toFlowItems.length; i++) {
        if (toFlowItems[i].id === afterId + 1) newToFlowItems.push(item);
        newToFlowItems.push(toFlowItems[i]);
      }

      fromSetFlowItems(newFromFlowItems);
      toSetFlowItems(newToFlowItems);
    }
  };

  return (
    <ChartCtx.Provider
      value={{
        flowList,
        activeData,
        changeActiveItem,
        createFlowItem,
        deleteFlowItem,
        replaceFlowItem,
      }}
    >
      {props.children}
    </ChartCtx.Provider>
  );
}
