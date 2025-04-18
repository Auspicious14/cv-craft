import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { FormikHelpers } from "formik";
import { AxiosClient } from "../../components";
import { ILanguage } from "./model";
import { usePersonalInfo } from "../personal-info/context";
import { useRouter } from "next/navigation";

export interface ILanguageContext {
  Languages: ILanguage[];
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
  let cvId: string;
  const router = useRouter();

  const [Languages, setLanguages] = useState<ILanguage[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    cvId = localStorage.getItem("cvId");
  }, []);

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
      try {
        const response = await AxiosClient.put(`/cv/${cvId}/Language`, payload);
        const data = response?.data?.data;
        if (data) {
          setLanguages(response.data);
          actions.setSubmitting(false);
          router.push("/language");
        }
      } finally {
        setIsLoading(false);
      }
    },
    [cvId]
  );

  return (
    <LanguageContext.Provider
      value={{ Languages, isLoading, saveLanguages, fetchLanguages }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
