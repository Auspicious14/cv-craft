import React, { createContext, useCallback, useContext, useState } from "react";
import { AxiosClient } from "../components";

export interface IAiSuggestionContext {
  suggestion: { enhanced: string; suggestions: string[] };
  isLoading: boolean;
  saveAiSuggestion: (value: {
    content: string;
    section: string;
  }) => Promise<void>;
}

const AiSuggestionContext = createContext<IAiSuggestionContext | undefined>(
  undefined
);

export const AiSuggestionContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [suggestion, setSuggestion] = useState<{
    enhanced: string;
    suggestions: string[];
  }>(null);
  const [isLoading, setIsLoading] = useState(false);

  const saveAiSuggestion = useCallback(
    async (value: { content: string; section: string }) => {
      setIsLoading(true);
      try {
        const response = await AxiosClient.post("/ai/suggestion", value);
        if (response.status !== 200) {
          return;
        }
        setSuggestion(response.data);
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  return (
    <AiSuggestionContext.Provider
      value={{ suggestion, isLoading, saveAiSuggestion }}
    >
      {children}
    </AiSuggestionContext.Provider>
  );
};

export const useAiSuggestion = () => useContext(AiSuggestionContext);
