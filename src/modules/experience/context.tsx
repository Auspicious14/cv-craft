import React, { createContext, useCallback, useContext, useState } from "react";
import { FormikHelpers } from "formik";
import { IExperience } from "./model";
import { AxiosClient } from "../../components";

export interface IExperienceContext {
  experiences: IExperience[];
  isLoading: boolean;
  saveExperience: (
    values: IExperience[],
    actions: FormikHelpers<any>
  ) => Promise<void>;
  fetchExperiences: () => Promise<void>;
}

const ExperienceContext = createContext<IExperienceContext>({
  experiences: [],
  isLoading: false,
  saveExperience: async () => {},
  fetchExperiences: async () => {},
});

export const ExperienceContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [experiences, setExperiences] = useState<IExperience[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchExperiences = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await AxiosClient.get("/experience");
      setExperiences(response.data);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const saveExperience = useCallback(
    async (values: IExperience[], actions: FormikHelpers<any>) => {
      setIsLoading(true);
      try {
        const response = await AxiosClient.post("/experience", values);
        setExperiences(response.data);
        actions.setSubmitting(false);
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  return (
    <ExperienceContext.Provider
      value={{ experiences, isLoading, saveExperience, fetchExperiences }}
    >
      {children}
    </ExperienceContext.Provider>
  );
};

export const useExperience = () => useContext(ExperienceContext);
