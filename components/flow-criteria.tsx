"use client";

import Image from "next/image";

import parentStyles from "./flow-container.module.css";
import styles from "./flow-criteria.module.css";

import discardIcon from "@/public/icons/discardIcon.svg";
import Tooltip from "./tooltip";
import CriteriaBox from "./criteria/criteria-box";

export default function () {
  return (
    <div className={parentStyles.criteria__container}>
      <div className={styles.header}>
        <div className={styles.header__title}>Define Criteria</div>
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
