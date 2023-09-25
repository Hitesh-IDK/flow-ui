"use client";

import React, { Dispatch, JSX, MouseEvent, useContext, useState } from "react";
import styles from "./line-to-from.module.css";
import arrowDown from "@/public/arrows/arrowDown.png";
import arrowWithoutHead from "@/public/arrows/arrowWithoutHead.png";
import shortArrow from "@/public/arrows/shortArrow.png";
import add from "@/public/icons/plus_sign.svg";
import Image from "next/image";
import Tooltip from "@/components/helpers/tooltip";
import { ChartCtx } from "../chart-ctx";
import { ModalCtx } from "@/components/modal-ctx";
import AddModal from "./add-modal";

export default function ({
  isActive,
  id,
}: {
  isActive: boolean;
  id: number;
}): JSX.Element {
  const { createFlowItem } = useContext(ChartCtx);
  const { modalActive, setModalActive } = useContext(ModalCtx);

  const addHandler = (event: MouseEvent) => {
    setModalActive(true);
  };

  return (
    <>
      {modalActive && <AddModal createFlowItem={createFlowItem} />}
      {isActive ? (
        <div className={styles.line__active}>
          <Image
            src={arrowWithoutHead}
            alt="point to"
            className={styles.arrow__down}
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
            src={shortArrow}
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