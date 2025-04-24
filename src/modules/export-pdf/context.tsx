import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { AxiosClient } from "../../components";
import { ICV } from "./model";
import toast from "react-hot-toast";
import { useCVState } from "../../context/cv";

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
  const { cvId } = useCVState();
  const [cv, setCv] = useState<ICV>();
  const [isLoading, setIsLoading] = useState(false);

  const getCV = useCallback(async () => {
    if (!cvId) {
      toast.error("Missing CV ID");
      return;
    }
    setIsLoading(true);

    try {
      const response = await AxiosClient.get(`/cv/${cvId}`);
      const data = response.data?.data;
      console.log("CV response:", { data });
      setCv(data);
    } catch (error) {
      console.error("Error fetching CV:", error);
    } finally {
      setIsLoading(false);
    }
  }, [cvId]);

  // Add cvId to dependency array
  const saveExportPdf = useCallback(
    async (template: string) => {
      if (!cvId) {
        toast.error("Cannot save PDF: No cv found");
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
    },
    [cvId]
  );

  return (
    <ExportPdfContext.Provider value={{ isLoading, cv, saveExportPdf, getCV }}>
      {children}
    </ExportPdfContext.Provider>
  );
};

export const useExportPdf = () => useContext(ExportPdfContext);
