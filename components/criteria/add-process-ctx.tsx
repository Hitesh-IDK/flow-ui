"use client";

import {
  Context,
  Dispatch,
  PropsWithChildren,
  createContext,
  useState,
} from "react";

export interface AddData {
  title: { titleInput: string; setTitleInput: Dispatch<string> };
  desc: { descInput: string; setDescInput: Dispatch<string> };
  origin: {
    originNode: number;
    setOriginNode: Dispatch<number>;
    originListNo: number;
    setOriginListNo: Dispatch<number>;
  };
  resetData(): void;
}

const placeHolderReset = (): void => {};
const placeHolderDispatchFunc = "" as unknown as Dispatch<string>;
const placeHolderDispatchFunc2 = "" as unknown as Dispatch<number>;

export const AddCtx: Context<AddData> = createContext<AddData>({
  title: { titleInput: "", setTitleInput: placeHolderDispatchFunc },
  desc: { descInput: "", setDescInput: placeHolderDispatchFunc },
  origin: {
    originNode: -1,
    setOriginNode: placeHolderDispatchFunc2,
    originListNo: 0,
    setOriginListNo: placeHolderDispatchFunc2,
  },
  resetData: placeHolderReset,
});

export default function (props: PropsWithChildren) {
  const [titleInput, setTitleInput] = useState("");
  const [descInput, setDescInput] = useState("");
  const [originNode, setOriginNode] = useState(-1);
  const [originListNo, setOriginListNo] = useState(0);

  const resetData = () => {
    setTitleInput("");
    setDescInput("");
  };

  const contextValue: AddData = {
    title: { titleInput, setTitleInput },
    desc: { descInput, setDescInput },
    origin: { originNode, setOriginNode, originListNo, setOriginListNo },
    resetData,
  };

  return (
    <AddCtx.Provider value={contextValue}>{props.children}</AddCtx.Provider>
  );
}
