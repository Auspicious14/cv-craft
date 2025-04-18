import React, { createContext, useCallback, useContext, useState } from "react";
import { FormikHelpers } from "formik";
import { AxiosClient } from "../../components";
import { ISkill } from "./model";
import { usePersonalInfo } from "../personal-info/context";

export interface ISkillContext {
  skills: ISkill[];
  isLoading: boolean;
  saveSkills: (values: ISkill[], actions: FormikHelpers<any>) => Promise<void>;
  fetchSkills: () => Promise<void>;
}

const SkillContext = createContext<ISkillContext>({
  skills: [],
  isLoading: false,
  saveSkills: async () => {},
  fetchSkills: async () => {},
});

export const SkillContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { cvId } = usePersonalInfo();

  const [skills, setSkills] = useState<ISkill[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchSkills = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await AxiosClient.get(`/cv/${cvId}/skill`);
      setSkills(response.data);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const saveSkills = useCallback(
    async (payload: ISkill[], actions: FormikHelpers<any>) => {
      setIsLoading(true);
      try {
        const response = await AxiosClient.put(`/cv/${cvId}/skill`, payload);
        setSkills(response.data);
        actions.setSubmitting(false);
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  return (
    <SkillContext.Provider
      value={{ skills, isLoading, saveSkills, fetchSkills }}
    >
      {children}
    </SkillContext.Provider>
  );
};

export const useSkill = () => useContext(SkillContext);
