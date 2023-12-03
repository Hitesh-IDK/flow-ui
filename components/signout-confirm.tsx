import { Dispatch, useState } from "react";
import styles from "./signout-confirm.module.css";
import { signOut } from "next-auth/react";

interface signoutProps {
  setSignout: Dispatch<boolean>;
}

export default function (props: signoutProps): JSX.Element {
  const { setSignout } = props;

  const [isLoading, setIsLoading] = useState(false);

  const yes_handler = (e: React.MouseEvent) => {
    e.preventDefault();

    setIsLoading(true);

    const response = signOut();
    console.log(response);

    setSignout(false);
    setIsLoading(false);
  };

  const no_handler = (e: React.MouseEvent) => {
    e.preventDefault();

    setSignout(false);
  };

  return (
    <div className={styles.modal__container}>
      {!isLoading ? (
        <>
          <div className={styles.modal__title}>Sign Out?</div>
          <div className={styles.options}>
            <button className={styles.btn__yes} onClick={yes_handler}>
              Yes
            </button>
            <button className={styles.btn__no} onClick={no_handler}>
              No
            </button>
          </div>
        </>
      ) : (
        <>
          <span className={styles.loader}></span>
        </>
      )}
    </div>
  );
}
