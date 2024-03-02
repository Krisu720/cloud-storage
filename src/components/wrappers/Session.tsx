"use client";

import React, {
  ReactNode,
  useEffect,
} from "react";
import { useSession } from "~/hooks/useSession";
import { api } from "~/trpc/react";

const SessionProvider = ({ children }: { children: ReactNode }) => {

  const {setUser} = useSession()

  const getSession = api.auth.getUser.useQuery();

  useEffect(() => {
    setUser(getSession.data ?? null)
  }, [getSession.data]);

  return (
    <>
      {children}
    </>
  );
};

export default SessionProvider;
