import React, { FC, ComponentProps } from "react";
import { Toaster } from "react-hot-toast";
import { AuthContextProvider } from "../modules/auth/context";
import { PersonalInfoContextProvider } from "../modules/personal-info/context";
import { CertificateContextProvider } from "../modules/certificates/context";
import { ExperienceContextProvider } from "../modules/experience/context";
import { AcademyContextProvider } from "../modules/academics/context";
import { SkillContextProvider } from "../modules/skills/context";
import { AiSuggestionContextProvider } from "./suggestion";
import { LanguageContextProvider } from "../modules/language/context";

export const combineContext = (...components: FC[]): FC<any> => {
  const CombinedComponent = components.reduce(
    (AccumulatedComponents: any, CurrentComponent: any) => {
      const WrapperComponent: FC<any> = ({
        children,
      }: ComponentProps<FC<any>>): JSX.Element => {
        return (
          <AccumulatedComponents>
            <CurrentComponent>{children}</CurrentComponent>
          </AccumulatedComponents>
        );
      };

      // Assign a displayName to the WrapperComponent
      WrapperComponent.displayName = `Combined(${
        CurrentComponent.displayName || CurrentComponent.name || "Unknown"
      })`;

      return WrapperComponent;
    },
    ({ children }: any) => (
      <>
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
      </>
    )
  );

  return CombinedComponent;
};

const providers = [
  AuthContextProvider,
  PersonalInfoContextProvider,
  ExperienceContextProvider,
  CertificateContextProvider,
  AcademyContextProvider,
  SkillContextProvider,
  AiSuggestionContextProvider,
  LanguageContextProvider,
] as any;
export const AppContextProvider = combineContext(...providers);
