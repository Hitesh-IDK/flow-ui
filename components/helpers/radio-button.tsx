import { MouseEvent } from "react";
import styles from "./radio-button.module.css";
import { States } from "../dropdown-ctx";

interface Radio {
  name: string;
  label: string;
  value: string;
  state: States;
  handleChange: CallableFunction;
}

export default ({
  name,
  label,
  value,
  state,
  handleChange,
}: Radio): JSX.Element => {
  const { isActive, setIsActive } = state;

  const handleRadioChange = (e: MouseEvent) => {
    handleChange(setIsActive);
  };

  return (
    <div>
      <input
        type="radio"
        className={styles.regular__radio}
        name={name}
        id={value}
      />
      <label htmlFor={value} className={styles.custom__radio}>
        <span className={styles.radio__circle} onClick={handleRadioChange}>
          <span
            className={
              isActive ? styles.radio__checked : styles.radio__unchecked
            }
          ></span>
        </span>
        <span className={styles.radio__text}>{label}</span>
      </label>
    </div>
  );
};
