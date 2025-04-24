import React, { createContext, useCallback, useContext, useState } from "react";
import { FormikHelpers } from "formik";
import { IExperience } from "./model";
import { AxiosClient } from "../../components";
import { useRouter } from "next/router";
import toast from "react-hot-toast";

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
  const router = useRouter();
  const { cvId } = router.query;
  const [experiences, setExperiences] = useState<IExperience[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchExperiences = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await AxiosClient.get(`/cv/${cvId}/experience`);
      setExperiences(response.data);
    } finally {
      setIsLoading(false);
    }
  }, [cvId]);

  const saveExperience = useCallback(
    async (payload: IExperience[], actions: FormikHelpers<any>) => {
      setIsLoading(true);

      if (!cvId) {
        setIsLoading(false);
        toast.error("Missing CV ID");
        return;
      }
      try {
        const response = await AxiosClient.put(
          `/cv/${cvId}/experience`,
          payload
        );
        const data = response?.data?.data;
        if (data) {
          setExperiences(data);
          toast.success("Success!");
          router.push(`/cv/${cvId}/certificates`);
          actions.setSubmitting(false);
        }
      } finally {
        setIsLoading(false);
      }
    },
    [cvId]
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
