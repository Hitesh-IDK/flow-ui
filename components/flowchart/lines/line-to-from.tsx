"use client";

import React, {
  Dispatch,
  DragEvent,
  JSX,
  MouseEvent,
  useContext,
  useState,
} from "react";
import styles from "./line-to-from.module.css";
import arrowDown from "@/public/arrows/arrowDown.svg";
import lineStart from "@/public/arrows/line_start.svg";
import add from "@/public/icons/plus_sign.svg";
import Image from "next/image";
import Tooltip from "@/components/helpers/tooltip";
import { ChartCtx } from "../chart-ctx";
import { ModalCtx } from "@/components/modal-ctx";
import AddModal from "./add-modal";
import { useSession } from "next-auth/react";
import { MsgCtx, msgData } from "@/components/msg-ctx";

export default function ({
  isActive,
}: {
  isActive: boolean;
  id: number;
}): JSX.Element {
  const { createFlowItem } = useContext(ChartCtx);
  const { modalActive, setModalActive } = useContext(ModalCtx);
  const session = useSession();

  const {
    title: [_, setMsgTitle],
    desc: [__, setMsgDesc],
    status: [___, setMsgStatus],
  }: msgData = useContext(MsgCtx);

  const addHandler = () => {
    if (session.status === "unauthenticated") {
      setMsgTitle("Not Authenticated");
      setMsgDesc("Consider signing in before interacting with the ui");
      setMsgStatus("error");

      return;
    }

    setModalActive(true);
  };

  return (
    <>
      {modalActive && <AddModal createFlowItem={createFlowItem} />}
      {isActive ? (
        <div className={styles.line__active}>
          <Image
            src={lineStart}
            alt="point to"
            className={styles.line__start}
          />
          <Tooltip content="New Request">
            <div className={styles.add__container} onClick={addHandler}>
              <Image
                src={add}
                alt="add an item to list"
                className={styles.add__item}
              />
            </div>
          </Tooltip>
          <Image
            src={arrowDown}
            alt="short arrow pointing"
            className={styles.arrow__short}
          />
        </div>
      ) : (
        <div className={styles.line__inActive}>
          <Image
            src={arrowDown}
            alt="point to"
            className={styles.arrow__down}
          />
        </div>
      )}
    </>
  );
}
