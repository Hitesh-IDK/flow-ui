import React, { useContext, useState, ChangeEvent } from "react";
import { ChartCtx, FlowItem } from "../flowchart/chart-ctx";
import { ModalCtx } from "../modal-ctx";
import styles from "./add-process.module.css";
import Draggable from "react-draggable";

export default function (): React.JSX.Element {
  const [nameInput, setNameInput] = useState("");
  const [descInput, setDescInput] = useState("");

  const [addActive, setAddActive] = useState(false);
  const { activeItem: afterId } = useContext(ChartCtx);

  //   const { modalActive, setModalActive } = useContext(ModalCtx);

  const nameChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (value.length > 0) setAddActive(true);
    else setAddActive(false);

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
      desc: `Info: ${descInput}`,
      id: afterId + 1,
      isActive: false,
    };

    // createFlowItem(afterId, item);

    // if (modalActive) setModalActive(false);
    setDescInput("");
    setNameInput("");
  };

  const closeHandler = () => {
    // if (modalActive) setModalActive(false);

    setDescInput("");
    setNameInput("");
  };

  const addButtonStyles = `${styles.btn__add_container} ${
    afterId >= 0 && addActive ? "" : styles.hidden
  }`;

  const itemStyles = `${styles.item__container_main} ${
    addActive ? "" : styles.hidden
  }`;

  return (
    <div className={styles.main__container}>
      <div className={styles.field__container}>
        <div className={styles.add__indicator}>Add Process</div>
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
      </div>
      <Draggable>
        <div className={itemStyles}>
          <div className={styles.item__container}>
            <div className={styles.item__label}>{nameInput}</div>
            <div className={styles.item__desc}>{`Info: ${descInput}`}</div>
          </div>
        </div>
      </Draggable>
      <div className={addButtonStyles}>
        <button className={styles.btn__add} onClick={addHandler}>
          Add Process
        </button>
      </div>
    </div>
  );
}
