import React, { createContext, useCallback, useContext, useState } from "react";
import { FormikHelpers } from "formik";
import { AxiosClient } from "../../components";
import { IAcademy } from "./model";

export interface IAcademyContext {
  academics: IAcademy[];
  isLoading: boolean;
  saveAcademics: (
    values: IAcademy[],
    actions: FormikHelpers<any>
  ) => Promise<void>;
  fetchAcademics: () => Promise<void>;
}

const AcademyContext = createContext<IAcademyContext>({
  academics: [],
  isLoading: false,
  saveAcademics: async () => {},
  fetchAcademics: async () => {},
});

export const AcademyContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [academics, setAcademics] = useState<IAcademy[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchAcademics = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await AxiosClient.get("/academics");
      setAcademics(response.data);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const saveAcademics = useCallback(
    async (values: IAcademy[], actions: FormikHelpers<any>) => {
      setIsLoading(true);
      try {
        const response = await AxiosClient.post("/academics", values);
        setAcademics(response.data);
        actions.setSubmitting(false);
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  return (
    <AcademyContext.Provider
      value={{ academics, isLoading, saveAcademics, fetchAcademics }}
    >
      {children}
    </AcademyContext.Provider>
  );
};

export const useAcademy = () => useContext(AcademyContext);
