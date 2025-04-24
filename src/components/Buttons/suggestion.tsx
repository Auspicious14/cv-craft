import React, { useState } from "react";
import { Button } from "./index";
import { useAiSuggestion } from "../../context/suggestion";

interface IProps {
  section: "experience" | "academic" | "skills" | "personal";
  content: string;
  onEnhanced: (enhanced: string, suggestions: string[]) => void;
}

export const AIEnhanceButton: React.FC<IProps> = ({
  section,
  content,
  onEnhanced,
}) => {
  const { isLoading, saveAiSuggestion, suggestion } = useAiSuggestion();
  const [originalContent, setOriginalContent] = useState(content);
  const [showUndo, setShowUndo] = useState(false);

  const handleEnhance = async () => {
    setOriginalContent(content);

    await saveAiSuggestion({
      section,
      content,
    });

    onEnhanced(suggestion?.enhanced, suggestion?.suggestions);
    setShowUndo(true);
  };

  const handleUndo = () => {
    onEnhanced(originalContent, []);
    setShowUndo(false);
  };
  return (
    <div className="flex gap-2 items-center">
      <Button
        variant="primary"
        onClick={handleEnhance}
        disabled={isLoading}
        isLoading={isLoading}
      >
        {"AI Enhance ✨"}
      </Button>

      {showUndo && (
        <Button
          onClick={handleUndo}
          variant="danger"
          title="Revert to original"
        >
          Undo
        </Button>
      )}
    </div>
  );
};
