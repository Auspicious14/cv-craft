import React, { createContext, useCallback, useContext, useState } from "react";
import { AxiosClient } from "../components";

export interface IAiSuggestionResult {
  enhanced: string;
  suggestions: string[];
}

export interface IAiSuggestionContext {
  suggestion: IAiSuggestionResult | null;
  isLoading: boolean;
  saveAiSuggestion: (value: {
    content: string;
    section: string;
  }) => Promise<IAiSuggestionResult | undefined>;
}

const AiSuggestionContext = createContext<IAiSuggestionContext | undefined>(
  undefined
);

export const AiSuggestionContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [suggestion, setSuggestion] = useState<IAiSuggestionResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const saveAiSuggestion = useCallback(
    async (value: { content: string; section: string }) => {
      setIsLoading(true);
      try {
        const response = await AxiosClient.post("/ai/suggestion", value);
        if (response.status !== 200) {
          return;
        }
        setSuggestion(response.data?.data);
        return response.data?.data;
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

export const useAiSuggestion = () => {
  const context = useContext(AiSuggestionContext);

  if (!context) {
    throw new Error("useAiSuggestion must be used within AiSuggestionContextProvider");
  }

  return context;
};
