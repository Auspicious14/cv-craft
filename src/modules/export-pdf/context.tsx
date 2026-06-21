import React, {
  createContext,
  useCallback,
  useContext,
  useState,
} from "react";
import { AxiosClient } from "../../components";
import axios from "axios";
import { ICV, PDF_TEMPLATES, TPdfTemplate } from "./model";
import toast from "react-hot-toast";
import { useRouter } from "next/router";

export interface IExportPdfContext {
  isLoading: boolean;
  cv: ICV | undefined;
  getCV: () => Promise<void>;

  saveExportPdf: (template: TPdfTemplate) => Promise<void>;
}

const ExportPdfContext = createContext<IExportPdfContext | undefined>(
  undefined
);

export const ExportPdfContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const router = useRouter();
  const { cvId } = router.query;
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
      setCv(data);
    } catch (error) {
      console.error("Error fetching CV:", error);
    } finally {
      setIsLoading(false);
    }
  }, [cvId]);

  const saveExportPdf = useCallback(
    async (template: TPdfTemplate) => {
      if (!cvId) {
        toast.error("Cannot save PDF: No cv found");
        throw new Error("Missing CV ID");
      }

      if (!PDF_TEMPLATES.includes(template)) {
        toast.error("Invalid template selected");
        throw new Error("Invalid template selected");
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
        const fileNameMatch = contentDisposition?.match(
          /filename=['"]?([^'"]+)['"]?/
        );
        const fileName = fileNameMatch
          ? decodeURIComponent(fileNameMatch[1].trim())
          : `cv-${cvId}-${template}.pdf`;

        const blob =
          response.data instanceof Blob
            ? response.data
            : new Blob([response.data], { type: "application/pdf" });
        const url = window.URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", fileName);
        link.style.display = "none";
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(url);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          if (!error.response) {
            toast.error("Network error while generating the PDF");
            throw new Error("Network error while generating the PDF");
          }

          const responseData = error.response.data;
          if (responseData instanceof Blob) {
            try {
              const responseText = await responseData.text();
              const parsed = JSON.parse(responseText);
              const message =
                parsed?.message || parsed?.error || "Unable to generate PDF";
              toast.error(message);
              throw new Error(message);
            } catch (blobError) {
              const fallbackMessage = "Unable to generate PDF";
              toast.error(fallbackMessage);
              throw new Error(fallbackMessage);
            }
          }

          const message =
            error.response.data?.message || "Unable to generate PDF";
          toast.error(message);
          throw new Error(message);
        }

        throw error;
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
