"use client";

import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

function SessionContext({ children }: { children: ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>;
}

export default SessionContext;
