import React, {
  useContext,
  useState,
  ChangeEvent,
  DragEvent,
  useEffect,
} from "react";
import { ChartCtx, FlowItem } from "../flowchart/chart-ctx";
import { ModalCtx } from "../modal-ctx";
import styles from "./add-process.module.css";
import { AddCtx } from "./add-process-ctx";

export default function (): React.JSX.Element {
  const { title, desc, resetData } = useContext(AddCtx);
  const { titleInput, setTitleInput } = title;
  const { descInput, setDescInput } = desc;

  const [addActive, setAddActive] = useState(false);
  const {
    activeData: {
      data: { listNo, node: afterId },
    },
    createFlowItem,
  } = useContext(ChartCtx);

  //   const { modalActive, setModalActive } = useContext(ModalCtx);

  const nameChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (value.length > 0) setAddActive(true);
    else setAddActive(false);

    setTitleInput(value);
  };

  const descChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setDescInput(value);
  };

  useEffect(() => {
    if (titleInput.length === 0) setAddActive(false);
  }, [titleInput, descInput]);

  const addHandler = () => {
    const item: FlowItem = {
      itemType: "node",
      label: titleInput,
      desc: descInput,
      id: afterId + 1,
      isActive: false,
    };

    createFlowItem(listNo, afterId, item);

    // if (modalActive) setModalActive(false);
    resetData();
  };

  const closeHandler = () => {
    // if (modalActive) setModalActive(false);

    resetData();
  };

  const addButtonStyles = `${styles.btn__add_container} ${
    afterId >= 0 && addActive ? "" : styles.hidden
  }`;

  const itemStyles = `${styles.item__container_main} ${
    addActive ? "" : styles.hidden
  }`;

  const dragHandler = (event: DragEvent) => {
    event.preventDefault();
    // console.log(event);
  };

  return (
    <div className={styles.main__container}>
      <div className={styles.field__container}>
        <div className={styles.add__indicator}>Add Process</div>
        <div className={styles.name__container}>
          <div className={styles.name__title}>Process Name</div>
          <input
            type="text"
            className={styles.input}
            value={titleInput}
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
      {/* <Draggable bounds="parent"> */}
      <div
        className={itemStyles}
        draggable
        onDrag={dragHandler}
        data-name="item"
      >
        <div className={styles.item__container}>
          <div className={styles.item__label}>{titleInput}</div>
          <div className={styles.item__desc}>{`Info: ${descInput}`}</div>
        </div>
      </div>
      {/* </Draggable> */}
      <div className={addButtonStyles}>
        <button className={styles.btn__add} onClick={addHandler}>
          Add Process
        </button>
      </div>
    </div>
  );
}
