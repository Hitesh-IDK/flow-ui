import styles from "./add-condition.module.css";

import { Dispatch, useState } from "react";
import RadioButton from "@/components/helpers/radio-button";

export type State = { isActive: boolean; setIsActive: Dispatch<boolean> };
//TODO
export default function (): JSX.Element {
  const radioOptions: string[] = [
    "All Conditions are met",
    "Any Conditions are met",
  ];

  const [isActive1, setIsActive1]: [boolean, Dispatch<boolean>] =
    useState(false);
  const [isActive2, setIsActive2]: [boolean, Dispatch<boolean>] =
    useState(false);

  const conditionStates: State[] = [
    { isActive: isActive1, setIsActive: setIsActive1 },
    { isActive: isActive2, setIsActive: setIsActive2 },
  ];

  const handleChange = (setIsActive: Dispatch<boolean>) => {
    conditionStates.forEach((state: State) => {
      if (state.isActive) state.setIsActive(false);
    });

    setIsActive(true);
  };

  const renderConditions = radioOptions.map((label, i) => (
    <RadioButton
      name="conditions"
      value={`option--${i + 1}`}
      label={label}
      state={conditionStates[i]}
      handleChange={handleChange}
      key={i}
    />
  ));

  return (
    <div className={styles.condition__container}>
      <span className={styles.condition__indicator}>Logical Operator</span>
      {renderConditions}
    </div>
  );
}
