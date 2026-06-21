import { IAcademy } from "../academics/model";
import { ICertificate } from "../certificates/model";
import { IExperience } from "../experience/model";
import { ILanguage } from "../language/model";
import { IPersonalInfo } from "../personal-info/model";
import { ISkill } from "../skills/model";

export const PDF_TEMPLATES = ["classic", "modern", "ats"] as const;

export type TPdfTemplate = (typeof PDF_TEMPLATES)[number];

export interface ICV {
  personalInformation: IPersonalInfo;
  academic: IAcademy[];
  experience: IExperience[];
  skill: ISkill[];
  certificate: ICertificate[];
  language: ILanguage[];
}
