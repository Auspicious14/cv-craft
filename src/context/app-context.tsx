import React, { useState, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { AcademyContextProvider } from "../modules/academics/context";
import { ExperienceContextProvider } from "../modules/experience/context";
import { PersonalInfoContextProvider } from "../modules/personal-info/context";
import { SkillContextProvider } from "../modules/skills/context";
import { CertificateContextProvider } from "../modules/certificates/context";
import { AuthContextProvider } from "../modules/auth/context";
import { AiSuggestionContextProvider } from "./suggestion";

export function AppContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AuthContextProvider>
        <AcademyContextProvider>
          <ExperienceContextProvider>
            <PersonalInfoContextProvider>
              <SkillContextProvider>
                <CertificateContextProvider>
                  <AiSuggestionContextProvider>
                    {children}
                    <Toaster
                      position="bottom-right"
                      toastOptions={{
                        style: {
                          background: "#1a1a1a",
                          color: "#fff",
                        },
                      }}
                    />
                  </AiSuggestionContextProvider>
                </CertificateContextProvider>
              </SkillContextProvider>
            </PersonalInfoContextProvider>
          </ExperienceContextProvider>
        </AcademyContextProvider>
      </AuthContextProvider>
    </>
  );
}
