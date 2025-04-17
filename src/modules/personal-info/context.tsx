import React, { createContext, useCallback, useContext, useState } from "react";
import { FormikHelpers } from "formik";
import { AxiosClient } from "../../components";
import { IPersonalInfo } from "./model";

export interface IPersonalInfoContext {
  personalInfo: IPersonalInfo | null;
  isLoading: boolean;
  savePersonalInfo: (
    values: Partial<IPersonalInfo>,
    actions: FormikHelpers<any>
  ) => Promise<void>;
  fetchPersonalInfo: () => Promise<void>;
}

const PersonalInfoContext = createContext<IPersonalInfoContext>({
  personalInfo: null,
  isLoading: false,
  savePersonalInfo: async () => {},
  fetchPersonalInfo: async () => {},
});

export const PersonalInfoContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [personalInfo, setPersonalInfo] = useState<IPersonalInfo | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchPersonalInfo = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await AxiosClient.get("/personal");
      setPersonalInfo(response.data);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const savePersonalInfo = useCallback(
    async (values: Partial<IPersonalInfo>, actions: FormikHelpers<any>) => {
      setIsLoading(true);
      try {
        const response = await AxiosClient.post("/cv/personal", values);
        setPersonalInfo(response.data);
        actions.setSubmitting(false);
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  return (
    <PersonalInfoContext.Provider
      value={{ personalInfo, isLoading, savePersonalInfo, fetchPersonalInfo }}
    >
      {children}
    </PersonalInfoContext.Provider>
  );
};

export const usePersonalInfo = () => useContext(PersonalInfoContext);
