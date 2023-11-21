"use client";

import styles from "./add-modal.module.css";
import { ChangeEvent, JSX, useContext, useState } from "react";
import closeIcon from "@/public/icons/close.svg";
import Image from "next/image";
import { ActiveFlow, ChartCtx, FlowItem } from "../chart-ctx";
import { ModalCtx } from "@/components/modal-ctx";

interface Props {
  createFlowItem(listNo: number, afterId: number, item: FlowItem): void;
}

export default function ({ createFlowItem }: Props): JSX.Element {
  const [nameInput, setNameInput] = useState("");
  const [descInput, setDescInput] = useState("");
  const {
    activeData: {
      data: { listNo, node: afterId },
    },
  } = useContext(ChartCtx);

  const { modalActive, setModalActive } = useContext(ModalCtx);

  const nameChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setNameInput(value);
  };

  const descChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setDescInput(value);
  };

  const addHandler = () => {
    const item: FlowItem = {
      itemType: "node",
      label: nameInput,
      desc: descInput,
      id: afterId + 1,
      listId: listNo,
      isActive: false,
    };

    createFlowItem(listNo, afterId, item);

    if (modalActive) setModalActive(false);
    setDescInput("");
    setNameInput("");
  };

  const closeHandler = () => {
    if (modalActive) setModalActive(false);

    setDescInput("");
    setNameInput("");
  };

  return (
    <div className={styles.modal__container}>
      <div className={styles.modal__title}>
        Add a Process
        <div className={styles.icon__close_container} onClick={closeHandler}>
          <Image
            src={closeIcon}
            alt="close modal"
            className={styles.icon__close}
          />
        </div>
      </div>
      <div className={styles.name__container}>
        <div className={styles.name__title}>Process Name</div>
        <input
          type="text"
          className={styles.input}
          value={nameInput}
          onChange={nameChangeHandler}
        />
      </div>
      <div className={styles.desc__container}>
        <div className={styles.desc__title}>Description</div>
        <input
          type="text"
          className={styles.input}
          value={descInput}
          onChange={descChangeHandler}
        />
      </div>
      <div className={styles.btn__add_container}>
        <button className={styles.btn__add} onClick={addHandler}>
          Add Process
        </button>
      </div>
    </div>
  );
}
