import React, { useState } from "react";
import { useExportPdf } from "./context";
import { Button } from "../../components";
import { useAiSuggestion } from "../../context/suggestion";
import { PDF_TEMPLATES, TPdfTemplate } from "./model";
import { toast } from "react-hot-toast";

const SECTION_OPTIONS = [
  { value: "personal", label: "Personal summary" },
  { value: "experience", label: "Experience" },
  { value: "academic", label: "Education" },
  { value: "skills", label: "Skills" },
] as const;

const isPdfTemplate = (value: string): value is TPdfTemplate => {
  return (PDF_TEMPLATES as readonly string[]).includes(value);
};

export const PreviewPage = () => {
  const { saveExportPdf, isLoading: isDownloading } = useExportPdf();
  const { isLoading: isSuggesting, saveAiSuggestion } = useAiSuggestion();
  const [selectedTemplate, setSelectedTemplate] = useState<TPdfTemplate>("ats");
  const [selectedSection, setSelectedSection] = useState<(typeof SECTION_OPTIONS)[number]["value"]>("personal");
  const [content, setContent] = useState(
    "Experienced frontend developer with a focus on accessible UI, clear communication, and reliable delivery."
  );
  const [enhancedText, setEnhancedText] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [message, setMessage] = useState<string | null>(null);

  const handleImprove = async () => {
    setMessage(null);
    const result = await saveAiSuggestion({
      section: selectedSection,
      content,
    });

    if (!result) {
      setMessage("Unable to generate AI suggestion. Please try again.");
      return;
    }

    setEnhancedText(result.enhanced);
    setSuggestions(result.suggestions || []);
  };

  const handleGeneratePdf = async () => {
    setMessage(null);

    if (!isPdfTemplate(selectedTemplate)) {
      setMessage("Invalid template selected.");
      toast.error("Invalid template selected.");
      return;
    }

    try {
      await saveExportPdf(selectedTemplate);
      setMessage("PDF download started.");
    } catch (error) {
      setMessage(
        error instanceof Error ? error.message : "Unable to download PDF."
      );
    }
  };

  return (
    <main className="min-h-[calc(100vh-72px)] bg-slate-50 px-4 py-10 text-slate-900 dark:bg-slate-950 dark:text-slate-50">
      <div className="mx-auto flex max-w-5xl flex-col gap-6">
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
            CV export
          </p>
          <h1 className="mt-2 text-3xl font-semibold">Choose a template and download your PDF</h1>
          <p className="mt-2 max-w-2xl text-sm text-slate-600 dark:text-slate-300">
            Select a template, improve a section with AI, then generate the PDF directly from the backend.
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {PDF_TEMPLATES.map((template) => (
              <button
                key={template}
                type="button"
                onClick={() => setSelectedTemplate(template)}
                className={`rounded-2xl border px-4 py-3 text-left transition ${
                  selectedTemplate === template
                    ? "border-slate-900 bg-slate-900 text-white dark:border-slate-100 dark:bg-slate-100 dark:text-slate-900"
                    : "border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-400 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200"
                }`}
              >
                <span className="block text-sm uppercase tracking-[0.2em] opacity-70">
                  Template
                </span>
                <span className="mt-1 block text-lg font-semibold capitalize">
                  {template}
                </span>
              </button>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button
              variant="primary"
              isLoading={isDownloading}
              disabled={isDownloading}
              onClick={handleGeneratePdf}
            >
              Download PDF
            </Button>
            <span className="inline-flex items-center rounded-full border border-slate-200 px-3 py-2 text-sm text-slate-600 dark:border-slate-700 dark:text-slate-300">
              Selected template: {selectedTemplate}
            </span>
          </div>
          {message && (
            <p className="mt-4 rounded-2xl bg-slate-100 px-4 py-3 text-sm text-slate-700 dark:bg-slate-800 dark:text-slate-200">
              {message}
            </p>
          )}
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <h2 className="text-xl font-semibold">AI suggestion preview</h2>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
              Send one section to the backend and review the improved text before exporting.
            </p>

            <div className="mt-5 grid gap-4">
              <label className="grid gap-2 text-sm font-medium text-slate-700 dark:text-slate-200">
                Section
                <select
                  value={selectedSection}
                  onChange={(event) => setSelectedSection(event.target.value as (typeof SECTION_OPTIONS)[number]["value"])}
                  className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none ring-0 transition focus:border-slate-400 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-50"
                >
                  {SECTION_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </label>

              <label className="grid gap-2 text-sm font-medium text-slate-700 dark:text-slate-200">
                Section content
                <textarea
                  value={content}
                  onChange={(event) => setContent(event.target.value)}
                  rows={7}
                  className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none ring-0 transition focus:border-slate-400 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-50"
                />
              </label>

              <div>
                <Button
                  variant="outline"
                  isLoading={isSuggesting}
                  disabled={isSuggesting || !content.trim()}
                  onClick={handleImprove}
                >
                  Improve with AI
                </Button>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-slate-900 p-6 text-slate-50 shadow-sm dark:border-slate-800">
            <h2 className="text-xl font-semibold">Suggestion result</h2>
            <p className="mt-1 text-sm text-slate-300">
              The backend response is rendered here so the exported CV stays focused and readable.
            </p>

            <div className="mt-5 space-y-5">
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">
                  Improved text
                </h3>
                <div className="mt-2 rounded-2xl border border-slate-700 bg-slate-950 p-4 text-sm leading-6 text-slate-100">
                  {enhancedText || "Run AI improvement to preview the upgraded text here."}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">
                  Suggestions
                </h3>
                <ul className="mt-2 space-y-2 rounded-2xl border border-slate-700 bg-slate-950 p-4 text-sm text-slate-100">
                  {suggestions.length > 0 ? (
                    suggestions.map((item, index) => (
                      <li key={`${item}-${index}`} className="flex gap-3">
                        <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-emerald-400" />
                        <span>{item}</span>
                      </li>
                    ))
                  ) : (
                    <li className="text-slate-400">No suggestions yet.</li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};
