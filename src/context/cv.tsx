import React, { createContext, useContext, useEffect, useState } from "react";

interface ICVState {
  cvId: string;
  setCvId: (id: string) => void;
}

const CVContext = createContext<ICVState>({
  cvId: "",
  setCvId: () => {},
});

export const useCVState = () => useContext(CVContext);

export const CVContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [cvId, setCvId] = useState<string>(() => {
    // Optional: initialize from localStorage
    if (typeof window !== "undefined") {
      return localStorage.getItem("cvId") || "";
    }
    return "";
  });

  useEffect(() => {
    if (cvId) {
      localStorage.setItem("cvId", cvId);
    }
  }, [cvId]);

  return (
    <CVContext.Provider value={{ cvId, setCvId }}>
      {children}
    </CVContext.Provider>
  );
};
