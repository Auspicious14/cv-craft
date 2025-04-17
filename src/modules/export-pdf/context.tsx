import React, { createContext, useCallback, useContext, useState } from 'react';
import { AxiosClient } from '../../components';
import { FormikHelpers } from 'formik';

export interface IExportPdfContext {
  isLoading: boolean;
  saveExportPdf: (data: any, actions: FormikHelpers<any>) => Promise<void>;
}

const ExportPdfContext = createContext<IExportPdfContext>({
  isLoading: false,
  saveExportPdf: async () => {},
});

export const ExportPdfContextProvider = ({ 
  children 
}: { 
  children: React.ReactNode 
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const saveExportPdf = useCallback(async (data: any, actions: FormikHelpers<any>) => {
    setIsLoading(true);
    try {
      const response = await AxiosClient.post('/export/pdf', data, {
        responseType: 'blob'
      });

      // Create download link for PDF
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'cv.pdf');
      document.body.appendChild(link);
      link.click();
      link.parentNode?.removeChild(link);
    } finally {
      setIsLoading(false);
      actions.setSubmitting(false);
    }
  }, []);

  return (
    <ExportPdfContext.Provider value={{ isLoading, saveExportPdf }}>
      {children}
    </ExportPdfContext.Provider>
  );
};

export const useExportPdf = () => useContext(ExportPdfContext);