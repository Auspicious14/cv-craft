import React, { createContext, useCallback, useContext, useState } from "react";
import { FormikHelpers } from "formik";
import { AxiosClient } from "../../components";
import { ILanguage } from "./model";
import { useRouter } from "next/router";
import toast from "react-hot-toast";

export interface ILanguageContext {
  languages: ILanguage[];
  isLoading: boolean;
  saveLanguages: (
    values: ILanguage[],
    actions: FormikHelpers<any>
  ) => Promise<void>;
  fetchLanguages: () => Promise<void>;
}

const LanguageContext = createContext<ILanguageContext | undefined>(undefined);

export const LanguageContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const router = useRouter();
  const { cvId } = router.query;
  const [languages, setLanguages] = useState<ILanguage[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchLanguages = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await AxiosClient.get(`/cv/${cvId}/Language`);
      setLanguages(response.data);
    } finally {
      setIsLoading(false);
    }
  }, [cvId]);

  const saveLanguages = useCallback(
    async (payload: ILanguage[], actions: FormikHelpers<any>) => {
      setIsLoading(true);

      if (!cvId) {
        setIsLoading(false);
        toast.error("Missing CV ID");
        return;
      }
      try {
        const response = await AxiosClient.put(`/cv/${cvId}/Language`, payload);
        const data = response?.data?.data;
        if (data) {
          setLanguages(response.data);
          toast.success("Success!");
          actions.setSubmitting(false);
          router.push(`/cv/${cvId}/preview`);
        }
      } finally {
        setIsLoading(false);
      }
    },
    [cvId]
  );

  return (
    <LanguageContext.Provider
      value={{ languages, isLoading, saveLanguages, fetchLanguages }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
