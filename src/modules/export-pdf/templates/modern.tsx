import React from "react";
import { ICV } from "../model";
import { IPersonalInfo } from "../../personal-info/model";
interface IProps {
  cv: ICV;
}
export const ModernTemplate: React.FC<IProps> = ({ cv }) => {
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
    <main className="max-w-4xl mx-auto px-6 py-10  text-gray-800 dark:text-white">
      <header className="bg-gray-800 text-white text-center py-6 mb-8 rounded">
        <h1 className="text-3xl font-bold">
          {personalInformation.firstName} {personalInformation.lastName}
        </h1>
        <p className="mt-2">
          {personalInformation.email} | {personalInformation.phoneNumber}
        </p>
      </header>

      <section className="mb-8 dark:text-white">
        <h2 className="text-xl font-semibold dark:text-white text-gray-800 border-b-2 border-blue-500 pb-2 mb-2">
          Professional Summary
        </h2>
        <p>{personalInformation.description}</p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white border-b-2 border-blue-500 pb-2 mb-4">
          Education
        </h2>
        {academic.map((edu, index) => (
          <article key={index} className="mb-4">
            <h3 className="text-lg font-bold">
              {edu.degree}. • {edu.course}
            </h3>
            <p className="font-medium">{edu.school}</p>
            <p className="text-sm text-gray-600">
              {formatDate(edu.fromDate)} – {formatDate(edu.toDate)}
            </p>
          </article>
        ))}
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white border-b-2 border-blue-500 pb-2 mb-4">
          Professional Experience
        </h2>
        {experience.map((exp, index) => (
          <article key={index} className="mb-4">
            <h3 className="text-lg font-bold">{exp.jobTitle}</h3>
            <p className="font-medium">
              {exp.company} • {exp.location}
            </p>
            <p className="text-sm text-gray-600">
              {formatDate(exp.fromDate as string)} –{" "}
              {formatDate(exp.toDate as string)}
            </p>
            <p className="text-sm text-gray-600">
              {exp.description &&
                (exp.description as string)
                  .split("\n")
                  .map((line, idx) => <span key={idx}>{line}</span>)}
            </p>
          </article>
        ))}
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white border-b-2 border-blue-500 pb-2 mb-4">
          Certifications
        </h2>
        {certificate.map((cert, index) => (
          <article key={index} className="mb-4">
            <h3 className="text-lg font-bold">{cert.name}</h3>
            <p className="font-medium">
              {cert.institution} •{" "}
              <span className="text-sm text-gray-600">
                {formatDate(cert.year)}
              </span>
            </p>
          </article>
        ))}
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white border-b-2 border-blue-500 pb-2 mb-4">
          Skill
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {skill.map((skill, index) => (
            <div
              key={index}
              className="bg-gray-100 dark:text-gray-800 px-4 py-2 rounded text-center text-sm font-medium shadow-sm"
            >
              {skill.name}
            </div>
          ))}
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white border-b-2 border-blue-500 pb-2 mb-4">
          Language
        </h2>
        <ul className="list-disc list-inside text-sm">
          {language.map((lang, index) => (
            <li key={index}>
              <strong>{lang.name}</strong>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
};
