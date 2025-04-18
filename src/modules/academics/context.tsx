import React, { createContext, useCallback, useContext, useState } from "react";
import { FormikHelpers } from "formik";
import { AxiosClient } from "../../components";
import { IAcademy } from "./model";
import { usePersonalInfo } from "../personal-info/context";
import { useRouter } from "next/navigation";

export interface IAcademyContext {
  academics: IAcademy[];
  isLoading: boolean;
  saveAcademics: (
    values: IAcademy[],
    actions: FormikHelpers<any>
  ) => Promise<void>;
  fetchAcademics: () => Promise<void>;
}

const AcademyContext = createContext<IAcademyContext | undefined>(undefined);

export const AcademyContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const router = useRouter();
  const { cvId } = usePersonalInfo();
  const [academics, setAcademics] = useState<IAcademy[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchAcademics = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await AxiosClient.get(`/cv/${cvId}/academic`);
      setAcademics(response.data);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const saveAcademics = useCallback(
    async (payload: IAcademy[], actions: FormikHelpers<any>) => {
      setIsLoading(true);
      try {
        const response = await AxiosClient.put(`/cv/${cvId}/academic`, payload);
        if (response?.data) {
          setAcademics(response.data);
          router.push(`/experience`);

          actions.setSubmitting(false);
        }
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  return (
    <AcademyContext.Provider
      value={{ academics, isLoading, saveAcademics, fetchAcademics }}
    >
      {children}
    </AcademyContext.Provider>
  );
};

export const useAcademy = () => useContext(AcademyContext);
