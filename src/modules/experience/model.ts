export interface IExperience {
  _id?: string;
  jobTitle: string;
  company: string;
  fromDate?: Date | string | number;
  toDate?: Date | string | number;
  description: string;
  location: string;
}
