"use client";

import React, { Context, Dispatch, PropsWithChildren, useState } from "react";
import { createContext } from "react";

type booleanAuth = [boolean, Dispatch<boolean>];

export interface AuthCtxData {
  loginPressed: booleanAuth;
  loggedIn: booleanAuth;
}

const dummyBoolDispatch = "" as unknown as Dispatch<boolean>;

export const AuthCtx: Context<AuthCtxData> = createContext<AuthCtxData>({
  loginPressed: [false, dummyBoolDispatch],
  loggedIn: [false, dummyBoolDispatch],
});

export default function (props: PropsWithChildren): React.JSX.Element {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoginPressed, setIsLoginPressed] = useState(false);

  return (
    <AuthCtx.Provider
      value={{
        loggedIn: [isLoggedIn, setIsLoggedIn],
        loginPressed: [isLoginPressed, setIsLoginPressed],
      }}
    >
      {props.children}
    </AuthCtx.Provider>
  );
}
