import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

import { ISessionData } from "@sellgauge/common";

export const LS_SESSION_KEY = "session";

const lsSession = localStorage.getItem(LS_SESSION_KEY);

const defaultSessionData: ISessionData | null = lsSession
  ? JSON.parse(lsSession)
  : null;

export const AuthContext = createContext<ISessionData | null>(
  defaultSessionData
);
export const SessionStartContext = createContext<
  (sessionData: ISessionData) => void
>(() => {
  console.log("Session Context starts");
});
export const SessionEndContext = createContext<() => void>(() => {
  console.log("Session Context ends");
});

export function useAuth() {
  return useContext(AuthContext);
}

export function useSessionStart() {
  return useContext(SessionStartContext);
}

export function useSessionEnd() {
  return useContext(SessionEndContext);
}

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [sessionData, setSessionData] = useState<ISessionData | null>(
    defaultSessionData
  );

  function sessionStart(sessionData: ISessionData) {
    setSessionData(sessionData);
  }

  function sessionEnd() {
    setSessionData(null);
  }

  useEffect(() => {
    if (sessionData) {
      localStorage.setItem(LS_SESSION_KEY, JSON.stringify(sessionData));
    } else {
      localStorage.removeItem(LS_SESSION_KEY);
    }
  }, [sessionData]);

  return (
    <SessionStartContext.Provider value={sessionStart}>
      <SessionEndContext.Provider value={sessionEnd}>
        <AuthContext.Provider value={sessionData}>
          {children}
        </AuthContext.Provider>
      </SessionEndContext.Provider>
    </SessionStartContext.Provider>
  );
}
