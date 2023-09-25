"use client";

import React, {
  createContext,
  useState,
  Dispatch,
  PropsWithChildren,
  ReactNode,
  MouseEvent,
} from "react";
import styles from "./modal-ctx.module.css";

const demoSetModalActive = "demo" as unknown as Dispatch<boolean>;

export const ModalCtx = createContext({
  modalActive: false,
  setModalActive: demoSetModalActive,
});

interface Props {
  children: ReactNode;
}

export default function (props: Props): React.JSX.Element {
  const [modalActive, setModalActive]: [boolean, Dispatch<boolean>] =
    useState(false);

  const modalClickHandler = (event: MouseEvent) => {
    if (modalActive) setModalActive(false);
  };

  return (
    <ModalCtx.Provider value={{ modalActive, setModalActive }}>
      {modalActive && (
        <div
          className={styles.modal__backdrop}
          onClick={modalClickHandler}
        ></div>
      )}
      {props.children}
    </ModalCtx.Provider>
  );
}
