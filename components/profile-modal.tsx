import { Dispatch, useRef, useState, useContext } from "react";
import styles from "./profile-modal.module.css";
import { signOut, useSession } from "next-auth/react";
import { MsgCtx } from "./msg-ctx";

import Image from "next/image";
import closeIcon from "@/public/icons/close.png";
import validatePassword from "./helpers/validatePassword";

interface signoutProps {
  setProfilePressed: Dispatch<boolean>;
}

export default function (props: signoutProps): JSX.Element {
  const { setProfilePressed } = props;
  const session = useSession();

  const profileImage = session.data?.user?.image!;

  const {
    title: [msgTitle, setMsgTitle],
    desc: [msgDesc, setMsgDesc],
    status: [msgStatus, setMsgStatus],
  } = useContext(MsgCtx);

  const oldPasswordRef = useRef<HTMLInputElement>(null);
  const newPasswordRef = useRef<HTMLInputElement>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [signoutPressed, setSignoutpressed] = useState(false);
  const [changePressed, setChangePressed] = useState(false);

  const close__handler = () => {
    setProfilePressed(false);
  };

  const yes_handler = (e: React.MouseEvent) => {
    e.preventDefault();

    setIsLoading(true);

    const response = signOut();

    setProfilePressed(false);
    setIsLoading(false);
  };

  const no_handler = (e: React.MouseEvent) => {
    e.preventDefault();

    setSignoutpressed(false);
  };

  const confirm__handler = async () => {
    setIsLoading(true);

    if (!oldPasswordRef.current || !newPasswordRef.current) return;

    const oldPassword = oldPasswordRef.current.value;
    const newPassword = newPasswordRef.current.value;

    if (oldPassword === newPassword) {
      setMsgTitle("Identical Passwords");
      setMsgDesc("Old and New Passwords cannot be same");
      setMsgStatus("error");
      setIsLoading(false);

      newPasswordRef.current.value = "";

      return;
    }

    if (!(validatePassword(oldPassword) && validatePassword(newPassword))) {
      setMsgTitle("Invalid Password");
      setMsgDesc(
        "Check your password again, they must contain atleast 1 digit and atmost 6 characters"
      );
      setMsgStatus("error");
      setIsLoading(false);

      return;
    }

    const response = await fetch("./api/auth/change", {
      method: "POST",
      body: JSON.stringify({
        email: session.data?.user?.email,
        oldPassword,
        newPassword,
      }),
      headers: {
        "Content-type": "application/json",
      },
    });

    const data = await response.json();

    if (!response.ok) {
      setMsgTitle("Unable to update");
      setMsgDesc(data?.message);
      setMsgStatus("error");
      setIsLoading(false);

      return;
    }

    setIsLoading(false);
    setChangePressed(false);

    setMsgTitle("Update Successfull");
    setMsgDesc("Password has been updated successfull");
    setMsgStatus("success");
  };

  const cancel__handler = () => {
    setChangePressed(false);
  };

  const signout__handler = () => {
    if (changePressed) setChangePressed(false);

    setSignoutpressed(true);
  };

  const change__handler = () => {
    if (signoutPressed) setSignoutpressed(false);

    setChangePressed(true);
  };

  const googleProfile = (
    <>
      <div className={styles.modal__header}>
        <div className={styles.modal__title}>Profile</div>
        <Image
          alt="close"
          src={closeIcon}
          className={styles.icon__close}
          onClick={close__handler}
        />
      </div>

      <div className={styles.img__container}>
        <div className={styles.img__profile}>
          {/* <Image alt="profile" src={profileImage} width={100} height={100} /> */}
          <img
            alt="Profile Pic"
            src={profileImage}
            className={styles.img__profile}
          />
        </div>
      </div>

      <div className={styles.details__container}>
        <label className={styles.user}>Username</label>
        <div className={styles.user__value}>{session.data?.user?.name}</div>
        <label className={styles.email}>Email</label>
        <div className={styles.email__value}>{session.data?.user?.email}</div>

        {!signoutPressed && (
          <label className={styles.signout__google} onClick={signout__handler}>
            SignOut?
          </label>
        )}

        {signoutPressed && (
          <div className={styles.confirm__container}>
            <div className={styles.confirm__title}>Signing Out</div>
            <div className={styles.confirm__desc}>Are You Sure?</div>
            <div className={styles.options}>
              <button className={styles.btn__yes} onClick={yes_handler}>
                Yes
              </button>
              <button className={styles.btn__no} onClick={no_handler}>
                No
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );

  const credentialProfile = (
    <>
      <div className={styles.modal__header}>
        <div className={styles.modal__title}>Profile</div>
        <Image
          alt="close"
          src={closeIcon}
          className={styles.icon__close}
          onClick={close__handler}
        />
      </div>
      <div className={styles.details__container}>
        <label className={styles.email}>Email</label>
        <div className={styles.email__value}>{session.data?.user?.email}</div>

        {!signoutPressed && (
          <label className={styles.signout} onClick={signout__handler}>
            SignOut?
          </label>
        )}

        {signoutPressed && (
          <div className={styles.confirm__container}>
            <div className={styles.confirm__title}>Signing Out</div>
            <div className={styles.confirm__desc}>Are You Sure?</div>
            <div className={styles.options}>
              <button className={styles.btn__yes} onClick={yes_handler}>
                Yes
              </button>
              <button className={styles.btn__no} onClick={no_handler}>
                No
              </button>
            </div>
          </div>
        )}

        {!changePressed && (
          <div className={styles.change} onClick={change__handler}>
            Change Password?
          </div>
        )}

        {changePressed && (
          <div className={styles.confirm__container}>
            <div className={styles.confirm__title}>Change Password</div>
            {!isLoading ? (
              <>
                <div className={styles.confirm__desc}>Enter the details</div>
                <div className={styles.input__container}>
                  <label className={styles.label}>Old Password</label>
                  <input
                    className={styles.input}
                    ref={oldPasswordRef}
                    type="password"
                  />
                  <label className={styles.label}>New Password</label>
                  <input
                    className={styles.input}
                    ref={newPasswordRef}
                    type="password"
                  />
                </div>
                <div className={styles.options}>
                  <button className={styles.btn__no} onClick={confirm__handler}>
                    Confirm
                  </button>
                  <button className={styles.btn__yes} onClick={cancel__handler}>
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <span className={styles.loader}></span>
            )}
          </div>
        )}
      </div>
    </>
  );

  return (
    <div className={styles.modal__container}>
      {session.data?.user?.image ? googleProfile : credentialProfile}
    </div>
  );
}

// {
//   !isLoading ? (
//     <>
//       <div className={styles.modal__title}>Sign Out?</div>
//       <div className={styles.options}>
//         <button className={styles.btn__yes} onClick={yes_handler}>
//           Yes
//         </button>
//         <button className={styles.btn__no} onClick={no_handler}>
//           No
//         </button>
//       </div>
//     </>
//   ) : (
//     <>
//       <span className={styles.loader}></span>
//     </>
//   );
// }
