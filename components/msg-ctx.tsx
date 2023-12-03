"use client";

import { title } from "process";
import {
  Context,
  Dispatch,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { createContext } from "react";

export type statusCodes = "error" | "neutral" | "success" | "hidden";

export interface msgData {
  title: [string, Dispatch<string>];
  desc: [string, Dispatch<string>];
  status: [statusCodes, Dispatch<statusCodes>];
}

export const MsgCtx: Context<msgData> = createContext<msgData>({
  title: ["", "" as unknown as Dispatch<string>],
  desc: ["", "" as unknown as Dispatch<string>],
  status: ["success", "" as unknown as Dispatch<statusCodes>],
});

export default function (props: PropsWithChildren): React.JSX.Element {
  const [title, setTitle] = useState<string>("");
  const [desc, setDesc] = useState<string>("");
  const [status, setStatus] = useState<statusCodes>("hidden");

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (title !== "" || desc !== "" || status !== "hidden") {
      timer = setTimeout(() => {
        setStatus("hidden");
      }, 5000);
    }

    if (timer)
      return () => {
        clearTimeout(timer!);
      };
  }, [title, desc, status]);

  return (
    <MsgCtx.Provider
      value={{
        title: [title, setTitle],
        desc: [desc, setDesc],
        status: [status, setStatus],
      }}
    >
      {props.children}
    </MsgCtx.Provider>
  );
}
