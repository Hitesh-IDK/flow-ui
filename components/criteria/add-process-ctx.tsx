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
  resetData(): void;
}

const placeHolderReset = (): void => {};
const placeHolderDispatchFunc = "" as unknown as Dispatch<string>;

export const AddCtx: Context<AddData> = createContext<AddData>({
  title: { titleInput: "", setTitleInput: placeHolderDispatchFunc },
  desc: { descInput: "", setDescInput: placeHolderDispatchFunc },
  resetData: placeHolderReset,
});

export default function (props: PropsWithChildren) {
  const [titleInput, setTitleInput] = useState("");
  const [descInput, setDescInput] = useState("");

  const resetData = () => {
    setTitleInput("");
    setDescInput("");
  };

  const contextValue: AddData = {
    title: { titleInput, setTitleInput },
    desc: { descInput, setDescInput },
    resetData,
  };

  return (
    <AddCtx.Provider value={contextValue}>{props.children}</AddCtx.Provider>
  );
}
