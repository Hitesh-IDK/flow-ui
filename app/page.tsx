"use client";

import FlowContainer from "@/components/flow-container";
import React, { JSX } from "react";
import AuthCtxProvider from "@/components/auth-ctx";
import MsgCtxProvider from "@/components/msg-ctx";
import { SessionProvider } from "next-auth/react";

export default function Home(): JSX.Element {
  return (
    <SessionProvider>
      <AuthCtxProvider>
        <MsgCtxProvider>
          <FlowContainer />
        </MsgCtxProvider>
      </AuthCtxProvider>
    </SessionProvider>
  );
}
