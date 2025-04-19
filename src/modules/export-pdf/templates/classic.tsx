import { IPersonalInfo } from "../../personal-info/model";
import { ICV } from "../model";

interface IProps {
  cv: ICV;
}

export const ClassicTemplate: React.FC<IProps> = ({ cv }) => {
  const {
    personalInformation = {} as IPersonalInfo,
    academic = [] as ICV["academic"],
    experience = [] as ICV["experience"],
    skill = [] as ICV["skill"],
    certificate = [] as ICV["certificate"],
    language = [] as ICV["language"],
  } = cv || {};

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleString("default", { month: "short", year: "numeric" });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 font-serif text-gray-900">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold">
          {personalInformation.firstName} {personalInformation.lastName}
        </h1>
        <p className="mt-1">{personalInformation.address}</p>
        <p className="mt-1">
          {personalInformation.email} | {personalInformation.phoneNumber}
        </p>
      </div>

      <section className="mb-6">
        <h2 className="text-xl font-semibold border-b border-gray-700 mb-2">
          Professional Summary
        </h2>
        <p>{personalInformation.description}</p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold border-b border-gray-700 mb-2">
          Education
        </h2>
        {academic.map((edu, i) => (
          <div key={i} className="mb-4">
            <h3 className="text-lg font-bold">
              {edu.degree}. • {edu.course}
            </h3>
            <p className="font-medium">{edu.school}</p>
            <p className="text-sm text-gray-600">
              {formatDate(edu.fromDate)} – {formatDate(edu.toDate)}
            </p>
          </div>
        ))}
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold border-b border-gray-700 mb-2">
          Professional Experience
        </h2>
        {experience.map((exp, i) => (
          <div key={i} className="mb-4">
            <h3 className="text-lg font-bold">{exp.jobTitle}</h3>
            <p className="font-medium">
              {exp.company} • {exp.location}
            </p>
            <p className="text-sm text-gray-600">
              {formatDate(exp.fromDate as string)} –{" "}
              {formatDate(exp.toDate as string)}
            </p>
            <p>{exp.description}</p>
          </div>
        ))}
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold border-b border-gray-700 mb-2">
          Technical skill
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mt-3">
          {skill.map((skill, i) => (
            <div
              key={i}
              className="bg-gray-100 text-center py-2 px-3 rounded shadow-sm text-sm font-medium"
            >
              {skill.name}
            </div>
          ))}
        </div>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold border-b border-gray-700 mb-2">
          Certifications
        </h2>
        {certificate.map((cert, i) => (
          <div key={i} className="mb-3">
            <h3 className="text-lg font-bold">{cert.name}</h3>
            <p className="font-medium">
              {cert.institution} • {formatDate(cert.year)}
            </p>
          </div>
        ))}
      </section>

      {/* language */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold border-b border-gray-700 mb-2">
          language
        </h2>
        <ul className="list-disc list-inside">
          {language.map((lang, i) => (
            <li key={i} className="text-sm">
              {lang.name}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};
