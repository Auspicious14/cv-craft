import React, { createContext, useCallback, useContext, useState } from "react";
import { FormikHelpers } from "formik";
import { AxiosClient } from "../../components";
import { IAcademy } from "./model";
import { useRouter } from "next/router";
import toast from "react-hot-toast";

export interface IAcademyContext {
  academics: IAcademy[];
  isLoading: boolean;
  saveAcademics: (
    values: IAcademy[],
    actions: FormikHelpers<any>
  ) => Promise<void>;
  fetchAcademics: () => Promise<void>;
}

const AcademyContext = createContext<IAcademyContext | undefined>(undefined);

export const AcademyContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const router = useRouter();
  const { cvId } = router.query;
  const [academics, setAcademics] = useState<IAcademy[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchAcademics = useCallback(async () => {
    setIsLoading(true);
    console.log("cv id", cvId);
    try {
      const response = await AxiosClient.get(`/cv/${cvId}/academic`);
      setAcademics(response.data);
    } finally {
      setIsLoading(false);
    }
  }, [cvId]);

  const saveAcademics = useCallback(
    async (payload: IAcademy[], actions: FormikHelpers<any>) => {
      setIsLoading(true);
      if (!cvId) {
        toast.error("Missing CV ID");
        return;
      }

      try {
        const response = await AxiosClient.put(`/cv/${cvId}/academic`, payload);
        const data = response?.data?.data;
        if (data) {
          setAcademics(response.data);
          toast.success("Success!");
          router.push(`/cv/${cvId}/experience`);
          actions.setSubmitting(false);
        }
      } finally {
        setIsLoading(false);
      }
    },
    [cvId]
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
