"use client";

import { DropdownProvider } from "./dropdown-ctx";
import styles from "./flow-container.module.css";
import FlowCriteria from "./criteria/flow-criteria";
import FlowChart from "./flowchart/flow-chart";
import ChartCtxProvider, { FlowItem } from "./flowchart/chart-ctx";
import ModalCtx from "./modal-ctx";
import AddCtxProvider from "./criteria/add-process-ctx";
import { useContext, useRef, useState } from "react";
import { AuthCtx, AuthCtxData } from "./auth-ctx";
import Image from "next/image";
import closeIcon from "@/public/icons/close.png";
import { MsgCtx, msgData } from "./msg-ctx";
import EmailValidator from "email-validator";
import validatePassword from "./helpers/validatePassword";
import { signIn, signOut, useSession } from "next-auth/react";
import { authActions } from "@/app/api/auth/[...nextauth]/route";
import SignoutConfirm from "./signout-confirm";
import BackgroundBlur from "./background-blur";

export default function FlowContainer(): JSX.Element {
  let flows = {};

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confPasswordRef = useRef<HTMLInputElement>(null);

  const modalRef = useRef<HTMLDivElement>(null);

  const authData: AuthCtxData = useContext(AuthCtx);
  const [loginPressed, setLoginPressed] = authData.loginPressed;
  const [signupPressed, setSignupPressed] = useState(false);
  const [signoutPressed, setSignoutPressed] = useState(false);

  const session = useSession();

  const msgData: msgData = useContext(MsgCtx);
  const [status, setStatus] = msgData.status;
  const [title, setTitle] = msgData.title;
  const [desc, setDesc] = msgData.desc;

  let msgStatusStyles = styles.msg__hidden;

  switch (status) {
    case "hidden":
      msgStatusStyles = styles.msg__hidden;
      break;

    case "error":
      msgStatusStyles = styles.msg__error;
      break;

    case "neutral":
      msgStatusStyles = styles.msg__neutral;
      break;

    case "success":
      msgStatusStyles = styles.msg__success;
      break;

    default:
      msgStatusStyles = styles.msg__hidden;
  }

  const getFlows = (newFlows: { flow1: FlowItem; flow2: FlowItem }) => {
    flows = newFlows;
  };

  const signup__Handler = () => {
    setSignupPressed(true);
  };

  const save_handler = async () => {
    if (session.status === "unauthenticated") {
      setTitle("Not Authenticated");
      setDesc("Consider signing in before interacting with the ui");
      setStatus("error");

      return;
    }

    const response = await fetch("http://localhost:3000/api/flow", {
      method: "POST",
      body: JSON.stringify(flows),
      headers: {
        "Content-type": "application/json",
      },
    });

    if (!response.ok) {
      const data = await response.json();

      setTitle("Save Failed");
      setDesc(data.message);
      setStatus("error");
    } else {
      setTitle("Saved!");
      setDesc("Flows have been saved in our database!");
      setStatus("success");
    }
  };

  const signout__handler = () => {
    setSignoutPressed(true);
  };

  const submit_handler = async (e: React.MouseEvent) => {
    e.preventDefault();

    if (!emailRef.current || !passwordRef.current) return;

    let msg = "";
    let desc = "";

    if (signupPressed) {
      if (!confPasswordRef.current) return;

      if (passwordRef.current.value !== confPasswordRef.current.value) {
        msg = msg + "Passwords dont match";
        desc = desc + "Check both passwords again";
      }
    }

    if (!EmailValidator.validate(emailRef.current.value))
      msg = `Email is invalid, `;

    if (!validatePassword(passwordRef.current.value)) {
      if (msg.length === 0) {
        msg = msg + "Password is invalid";
        desc =
          desc +
          "Password must be atleast 6 digits in character, must containe atleast 1 numeric digit";
      } else {
        msg = msg + "Password is invalid";
        desc =
          desc +
          "Password must be atleast 6 digits in character, must containe atleast 1 numeric digit";
      }
    }

    if (msg.trim().length !== 0) {
      if (desc.trim().length === 0) desc = "Check the email and password again";
      setTitle(msg);
      setDesc(desc);
      setStatus("error");

      return;
    }

    const setAction: authActions = signupPressed ? "signUp" : "signIn";

    const response = await signIn("credentials", {
      redirect: false,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      action: setAction,
    });

    console.dir(response);

    if (response!.ok) {
      if (signupPressed) {
        setSignupPressed(false);
        setLoginPressed(false);

        emailRef.current.value = "";
        passwordRef.current.value = "";
        confPasswordRef.current!.value = "";

        setTitle("Signed Up");
        setDesc("SignUp was successful! Welcome to flows");
        setStatus("success");
      } else {
        setLoginPressed(false);

        emailRef.current.value = "";
        passwordRef.current.value = "";

        setTitle("Signed In");
        setDesc("SignIn was successful! Welcome back");
        setStatus("success");
      }
    } else {
      if (signupPressed) {
        setTitle("Sign Up Failed");
        setDesc(
          "Check your password and email again, maybe your account already exists"
        );
        setStatus("error");
      } else {
        setTitle("Sign In Failed");
        setDesc(
          "Check your password and email again, maybe your email is not registered"
        );
        setStatus("error");
      }
    }
  };

  const msgClose__handler = (): void => {
    setStatus("hidden");
  };

  const login__handler = () => {
    setSignupPressed(false);
    setLoginPressed(!loginPressed);
  };

  const google_signin_handler = (e: React.MouseEvent) => {
    e.preventDefault();

    signIn("google");
  };

  const click_handler = (e: React.MouseEvent) => {
    if (!modalRef.current) return;

    if (modalRef.current.contains(e.target as Node)) return;

    setLoginPressed(false);
  };

  return (
    <DropdownProvider>
      <ChartCtxProvider>
        <AddCtxProvider>
          {signoutPressed && (
            <>
              <BackgroundBlur />
              <SignoutConfirm setSignout={setSignoutPressed} />
            </>
          )}
          <div className={`${styles.msg__container} ${msgStatusStyles}`}>
            <div>
              <div className={styles.msg__title}>{title}</div>
              <div className={styles.msg__description}>Info: {desc}</div>
            </div>
            <Image
              alt="close"
              src={closeIcon}
              className={styles.icon__close}
              onClick={msgClose__handler}
            />
          </div>
          <div className={styles.container__top} onClick={click_handler}>
            <div className={styles.container__main}>
              <div className={styles.header__container}>
                <header className={styles.header}>Flow Header</header>
                <div className={styles.header__side}>
                  <button className={styles.btn__save} onClick={save_handler}>
                    Save
                  </button>
                  {session.status !== "authenticated" ? (
                    <div className={styles.login} onClick={login__handler}>
                      Login
                    </div>
                  ) : (
                    <div className={styles.login} onClick={signout__handler}>
                      SignOut
                    </div>
                  )}
                </div>
                {loginPressed && (
                  <div className={styles.login__modal} ref={modalRef}>
                    <div className={styles.login__title}>Credentials</div>
                    <label className={styles.login__email}>Email</label>
                    <input
                      type="email"
                      className={styles.input__email}
                      ref={emailRef}
                    ></input>
                    <label className={styles.login__password}>Password</label>
                    <input
                      type="password"
                      className={styles.input__password}
                      ref={passwordRef}
                    ></input>
                    {signupPressed ? (
                      <>
                        <label className={styles.login__password}>
                          Confirm Password
                        </label>
                        <input
                          type="password"
                          className={styles.input__password}
                          ref={confPasswordRef}
                        ></input>
                      </>
                    ) : (
                      <></>
                    )}
                    <button
                      type="submit"
                      onClick={submit_handler}
                      className={styles.btn__login}
                    >
                      {signupPressed ? "Register" : "Login"}
                    </button>
                    {!signupPressed ? (
                      <span className={styles.signUp} onClick={signup__Handler}>
                        New User? SignUp
                      </span>
                    ) : (
                      <span className={styles.signUp} onClick={login__handler}>
                        Existing User? Login
                      </span>
                    )}
                    <div className={styles.seperator}>
                      <span className={styles.seperator__text}>OR</span>
                    </div>
                    <button
                      className={styles.btn__google}
                      onClick={google_signin_handler}
                    >
                      Signin using google
                    </button>
                  </div>
                )}
              </div>
              <ModalCtx>
                <FlowChart sendFlow={getFlows} />
              </ModalCtx>
              <FlowCriteria />
            </div>
          </div>
        </AddCtxProvider>
      </ChartCtxProvider>
    </DropdownProvider>
  );
}
