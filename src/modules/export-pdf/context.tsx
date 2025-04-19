import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { AxiosClient } from "../../components";
import { FormikHelpers } from "formik";
import { ICV } from "./model";

export interface IExportPdfContext {
  isLoading: boolean;
  cv: ICV | undefined;
  getCV: () => Promise<void>;

  saveExportPdf: (template: string) => Promise<void>;
}

const ExportPdfContext = createContext<IExportPdfContext | undefined>(
  undefined
);

export const ExportPdfContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  let cvId: string;
  const [isLoading, setIsLoading] = useState(false);
  const [cv, setCv] = useState<ICV>();

  useEffect(() => {
    cvId = localStorage.getItem("cvId");
  }, []);

  const saveExportPdf = useCallback(async (template: string) => {
    setIsLoading(true);
    try {
      const response = await AxiosClient.post(
        `/cv/generate`,
        {
          cvId,
          template,
        },
        {
          responseType: "blob",
        }
      );

      const data = response.data?.data;
      console.log({ data });
      // Create download link for PDF
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${data.fileName || "cv"}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.parentNode?.removeChild(link);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getCV = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await AxiosClient.get(`/cv/${cvId}`);
      const data = response.data?.data;
      console.log(data);
      if (data) {
        setCv(data);
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <ExportPdfContext.Provider value={{ isLoading, cv, saveExportPdf, getCV }}>
      {children}
    </ExportPdfContext.Provider>
  );
};

export const useExportPdf = () => useContext(ExportPdfContext);
