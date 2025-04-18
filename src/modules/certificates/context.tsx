import React, { createContext, useCallback, useContext, useState } from "react";
import { ICertificate } from "./model";
import { FormikHelpers } from "formik";
import { AxiosClient } from "../../components";
import { usePersonalInfo } from "../personal-info/context";
import { useRouter } from "next/navigation";

interface ICertificateState {
  isLoading: boolean;
  certificates: ICertificate[];
  saveCertificates: (
    values: ICertificate[],
    actions: FormikHelpers<any>
  ) => Promise<any>;
}
const CertificateContext = createContext<ICertificateState | undefined>(
  undefined
);

export const useCertificateState = () => {
  const context = useContext(CertificateContext);
  if (context === undefined) {
    throw new Error("app dispatch must be used within app global provider");
  }
  return context;
};

interface IProps {
  children: React.ReactNode;
}

export const CertificateContextProvider: React.FC<IProps> = ({ children }) => {
  const router = useRouter();
  const { cvId } = usePersonalInfo();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [certificates, setCertificates] = useState<ICertificate[]>([]);

  const saveCertificates = useCallback(
    async (payload: ICertificate[], actions: FormikHelpers<any>) => {
      setIsLoading(true);
      try {
        const response = await AxiosClient.put(
          `/cv/${cvId}/certificate`,
          payload
        );
        if (response?.data) {
          setCertificates(response.data);
          router.push(`/skills`);

          actions.setSubmitting(false);
        }
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  return (
    <CertificateContext.Provider
      value={{ saveCertificates, isLoading, certificates }}
    >
      {children}
    </CertificateContext.Provider>
  );
};
