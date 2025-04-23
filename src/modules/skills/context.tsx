import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { FormikHelpers } from "formik";
import { AxiosClient } from "../../components";
import { ISkill } from "./model";
import { usePersonalInfo } from "../personal-info/context";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

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
  let cvId: string;
  const router = useRouter();
  const [skills, setSkills] = useState<ISkill[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    cvId = localStorage.getItem("cvId");
  }, []);

  const fetchSkills = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await AxiosClient.get(`/cv/${cvId}/skill`);
      setSkills(response.data);
    } finally {
      setIsLoading(false);
    }
  }, [cvId]);

  const saveSkills = useCallback(
    async (payload: ISkill[], actions: FormikHelpers<any>) => {
      setIsLoading(true);
      try {
        const response = await AxiosClient.put(`/cv/${cvId}/skill`, payload);
        const data = response?.data?.data;
        if (data) {
          setSkills(response.data);
          toast.success("Success!");
          actions.setSubmitting(false);
          router.push("/language");
        }
      } finally {
        setIsLoading(false);
      }
    },
    [cvId]
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
