import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { AxiosClient } from "../../components";
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
  // Change initial state from null to undefined to match interface
  const [cv, setCv] = useState<ICV>();
  const [isLoading, setIsLoading] = useState(false);
  const [cvId, setCvId] = useState<string | null>(null);

  useEffect(() => {
    const storedCvId = localStorage.getItem("cvId");
    setCvId(storedCvId || null); // Ensure we store null instead of undefined
  }, []);

  const getCV = useCallback(async () => {
    if (!cvId) {
      console.error('No cvId found in state');
      return;
    }
    
    setIsLoading(true);
    try {
      const response = await AxiosClient.get(`/api/cv/${cvId}`);
      setCv(response.data);
    } catch (error) {
      console.error("Error fetching CV:", error);
      setCv(undefined); // Reset CV on error
    } finally {
      setIsLoading(false);
    }
  }, [cvId]);

  // Add cvId to dependency array
  const saveExportPdf = useCallback(async (template: string) => {
    if (!cvId) {
      console.error('Cannot save PDF - no cvId available');
      return;
    }
    
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

      const contentDisposition = response.headers["content-disposition"];
      console.log("PDF generation response:", {
        status: response.status,
        headers: response.headers,
        data: response.data,
      });
      const fileNameMatch = contentDisposition.match(
        /filename=['"]?([^'"]+)['"]?/
      );
      const fileName = fileNameMatch
        ? decodeURIComponent(fileNameMatch[1].trim())
        : "cv.pdf";

      // Create download link for PDF
      const url = window.URL.createObjectURL(
        new Blob([response.data], { type: "application/pdf" })
      );
      window.open(url);

      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", fileName);
      document.body.appendChild(link);
      link.click();
      link.parentNode?.removeChild(link);
    } finally {
      setIsLoading(false);
    }
  }, [cvId]); // Add cvId as dependency

  return (
    <ExportPdfContext.Provider value={{ isLoading, cv, saveExportPdf, getCV }}>
      {children}
    </ExportPdfContext.Provider>
  );
};

export const useExportPdf = () => useContext(ExportPdfContext);
