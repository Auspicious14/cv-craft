import React, { createContext, useCallback, useContext, useState } from "react";
import { FormikHelpers } from "formik";
import { AxiosClient } from "../../components";
import { IPersonalInfo } from "./model";
import { useRouter } from "next/router";
import toast from "react-hot-toast";

export interface IPersonalInfoContext {
  personalInfo: IPersonalInfo | null;
  isLoading: boolean;
  savePersonalInfo: (
    values: Partial<IPersonalInfo>,
    actions: FormikHelpers<any>
  ) => Promise<void>;
  fetchPersonalInfo: () => Promise<void>;
}

const PersonalInfoContext = createContext<IPersonalInfoContext | undefined>(
  undefined
);

export const PersonalInfoContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const router = useRouter();
  const { cvId } = router.query;
  const [personalInfo, setPersonalInfo] = useState<IPersonalInfo | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchPersonalInfo = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await AxiosClient.get(`/cv/${cvId}/personal`);
      setPersonalInfo(response.data);
    } finally {
      setIsLoading(false);
    }
  }, [cvId]);

  const savePersonalInfo = useCallback(
    async (values: Partial<IPersonalInfo>, actions: FormikHelpers<any>) => {
      setIsLoading(true);
      try {
        const response = await AxiosClient.post("/cv/personal", values);
        const data = response.data?.data;
        if (data) {
          setPersonalInfo(data?.personalInformation);
          toast.success("Success!");
          router.push(`/cv/${cvId}/academics`);
        }
        actions.setSubmitting(false);
      } catch (error) {
        console.log({ error });
        actions.setSubmitting(false);
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  return (
    <PersonalInfoContext.Provider
      value={{
        personalInfo,
        isLoading,
        savePersonalInfo,
        fetchPersonalInfo,
      }}
    >
      {children}
    </PersonalInfoContext.Provider>
  );
};

export const usePersonalInfo = () => useContext(PersonalInfoContext);
