import React, { createContext, useCallback, useContext, useState } from "react";
import { ICertificate } from "./model";
import { FormikHelpers } from "formik";
import { AxiosClient } from "../../components";

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
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [certificates, setCertificates] = useState<ICertificate[]>([]);

  const saveCertificates = useCallback(
    async (values: ICertificate[], actions: FormikHelpers<any>) => {
      setIsLoading(true);
      try {
        const response = await AxiosClient.post("/academics", values);
        setCertificates(response.data);
        actions.setSubmitting(false);
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
