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
import { useSession } from "next-auth/react";
import { MsgCtx, msgData } from "../msg-ctx";

export default function (): JSX.Element {
  const {
    activeData: {
      data: { listNo, node },
      setData: setActiveData,
    },
    deleteFlowItem,
  } = useContext(ChartCtx);

  const session = useSession();
  const {
    title: [_, setMsgTitle],
    desc: [__, setMsgDesc],
    status: [___, setMsgStatus],
  }: msgData = useContext(MsgCtx);

  const closeHandler = () => {
    // setActiveItem(-1);
    setActiveData({ listNo, node: -1 });
  };

  const discardHandler = () => {
    if (session.status === "unauthenticated") {
      setMsgTitle("Not Authenticated");
      setMsgDesc("Consider signing in before interacting with the ui");
      setMsgStatus("error");

      return;
    }
    deleteFlowItem(listNo, node);
  };

  return (
    <div className={parentStyles.criteria__container}>
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
            <button className={styles.btn__discard} onClick={discardHandler}>
              <Image src={discardIcon} alt="discord criteria" />
            </button>
          </Tooltip>
        </div>
      </div>
      <CriteriaBox />
    </div>
  );
}
