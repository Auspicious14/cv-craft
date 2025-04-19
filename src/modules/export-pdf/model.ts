import { IAcademy } from "../academics/model";
import { ICertificate } from "../certificates/model";
import { IExperience } from "../experience/model";
import { ILanguage } from "../language/model";
import { IPersonalInfo } from "../personal-info/model";
import { ISkill } from "../skills/model";

export interface ICV {
  personalInformation: IPersonalInfo;
  academic: IAcademy[];
  experience: IExperience[];
  skills: ISkill[];
  certificates: ICertificate[];
  languages: ILanguage[];
}
