"use client";

import Image from "next/image";

import parentStyles from "../flow-container.module.css";
import styles from "./flow-criteria.module.css";

import discardIcon from "@/public/icons/discardIcon.svg";
import tabCloseIcon from "@/public/icons/tab_close.svg";
import Tooltip from "@/components/helpers/tooltip";
import CriteriaBox from "./criteria-box";
import { useContext } from "react";
import { ChartCtx } from "../flowchart/chart-ctx";
import CriteriaModal from "./criteria.modal";

export default function (): JSX.Element {
  const { activeItem, setActiveItem } = useContext(ChartCtx);

  const closeHandler = () => {
    setActiveItem(-1);
  };

  return (
    <div className={parentStyles.criteria__container}>
      {/* {activeItem === -1 && <CriteriaModal />} */}
      <div className={styles.header}>
        <div className={styles.header__title}>
          <span className={styles.icon__close} onClick={closeHandler}>
            <Tooltip content="Close">
              <Image src={tabCloseIcon} alt="go back" />
            </Tooltip>
          </span>
          Define Criteria
        </div>
        <div className={styles.header__buttons}>
          <Tooltip content="Discard">
            <button className={styles.btn__discard}>
              <Image src={discardIcon} alt="discord criteria" />
            </button>
          </Tooltip>
        </div>
      </div>
      <CriteriaBox />
    </div>
  );
}
