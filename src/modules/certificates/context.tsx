import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { ICertificate } from "./model";
import { FormikHelpers } from "formik";
import { AxiosClient } from "../../components";
import { usePersonalInfo } from "../personal-info/context";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useCVState } from "../../context/cv";

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
  const { cvId } = useCVState();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [certificates, setCertificates] = useState<ICertificate[]>([]);

  const saveCertificates = useCallback(
    async (payload: ICertificate[], actions: FormikHelpers<any>) => {
      setIsLoading(true);

      if (!cvId) {
        toast.error("Missing CV ID");
        setIsLoading(false);
        return;
      }
      try {
        const response = await AxiosClient.put(
          `/cv/${cvId}/certificate`,
          payload
        );
        const data = response?.data?.data;
        if (data) {
          setCertificates(data);
          toast.success("Success!");
          actions.setSubmitting(false);
          router.push(`/skills`);
        }
      } finally {
        setIsLoading(false);
      }
    },
    [cvId]
  );

  return (
    <CertificateContext.Provider
      value={{ saveCertificates, isLoading, certificates }}
    >
      {children}
    </CertificateContext.Provider>
  );
};
