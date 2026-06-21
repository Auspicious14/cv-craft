import React from "react";
import { ICV } from "../model";
import { IPersonalInfo } from "../../personal-info/model";

interface IProps {
  cv: ICV;
}

export const AtsTemplate: React.FC<IProps> = ({ cv }) => {
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
    <main className="mx-auto max-w-4xl bg-white px-6 py-10 text-slate-900">
      <header className="border-b border-slate-300 pb-5">
        <h1 className="text-3xl font-bold tracking-tight">
          {personalInformation.firstName} {personalInformation.lastName}
        </h1>
        <p className="mt-2 text-sm text-slate-700">
          {personalInformation.email} | {personalInformation.phoneNumber} | {personalInformation.address}
        </p>
      </header>

      <section className="mt-6">
        <h2 className="text-lg font-semibold uppercase tracking-[0.15em] text-slate-800">
          Summary
        </h2>
        <p className="mt-2 text-sm leading-6 text-slate-800">
          {personalInformation.description}
        </p>
      </section>

      <section className="mt-6">
        <h2 className="text-lg font-semibold uppercase tracking-[0.15em] text-slate-800">
          Experience
        </h2>
        <div className="mt-3 space-y-4 text-sm">
          {experience.map((exp, index) => (
            <article key={index} className="space-y-1">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="font-semibold">{exp.jobTitle}</h3>
                <p className="text-slate-600">
                  {formatDate(exp.fromDate as string)} - {formatDate(exp.toDate as string)}
                </p>
              </div>
              <p className="text-slate-700">
                {exp.company} | {exp.location}
              </p>
              <p className="leading-6 text-slate-800">{exp.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-6">
        <h2 className="text-lg font-semibold uppercase tracking-[0.15em] text-slate-800">
          Education
        </h2>
        <div className="mt-3 space-y-4 text-sm">
          {academic.map((edu, index) => (
            <article key={index} className="space-y-1">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="font-semibold">
                  {edu.course} - {edu.degree}
                </h3>
                <p className="text-slate-600">
                  {formatDate(edu.fromDate)} - {formatDate(edu.toDate)}
                </p>
              </div>
              <p className="text-slate-700">{edu.school}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-6">
        <h2 className="text-lg font-semibold uppercase tracking-[0.15em] text-slate-800">
          Skills
        </h2>
        <p className="mt-2 text-sm leading-6 text-slate-800">
          {skill.map((item) => item.name).join(", ")}
        </p>
      </section>

      <section className="mt-6">
        <h2 className="text-lg font-semibold uppercase tracking-[0.15em] text-slate-800">
          Certifications
        </h2>
        <div className="mt-3 space-y-2 text-sm text-slate-800">
          {certificate.map((cert, index) => (
            <p key={index}>
              {cert.name} | {cert.institution} | {formatDate(cert.year)}
            </p>
          ))}
        </div>
      </section>

      <section className="mt-6">
        <h2 className="text-lg font-semibold uppercase tracking-[0.15em] text-slate-800">
          Languages
        </h2>
        <p className="mt-2 text-sm leading-6 text-slate-800">
          {language.map((item) => item.name).join(", ")}
        </p>
      </section>
    </main>
  );
};