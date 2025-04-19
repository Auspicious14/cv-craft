import React, { useEffect, useState } from "react";
import { useExportPdf } from "./context";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { ClassicTemplate } from "./templates/classic";
import { ModernTemplate } from "./templates/modern";
import { Button } from "../../components";

export const PreviewPage = () => {
  const { getCV, cv, isLoading, saveExportPdf } = useExportPdf();
  const [selectedTemplate, setSelectedTemplate] = useState("modern");
  const [fileName, setFileName] = useState("my-cv");

  useEffect(() => {
    getCV();
  }, []);

  const handleGeneratePdf = async () => {
    await saveExportPdf(selectedTemplate);
  };
  console.log({ cv });

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Template Style
        </label>
        <select
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          value={selectedTemplate}
          onChange={(e) => setSelectedTemplate(e.target.value)}
        >
          <option value="modern">Modern Professional Template</option>
          <option value="classic">Classic Professional Template</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          File Name
        </label>
        <input
          type="text"
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          value={fileName}
          onChange={(e) => setFileName(e.target.value)}
          placeholder="Enter file name"
        />
      </div>

      <div className="mb-4 border rounded-lg p-4 max-h-96 overflow-y-auto">
        <h3 className="text-lg font-medium mb-2">Template Preview</h3>
        {selectedTemplate === "modern" ? (
          <ModernTemplate cv={cv} />
        ) : (
          <ClassicTemplate cv={cv} />
        )}
      </div>

      <Button
        className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
        onClick={handleGeneratePdf}
        disabled={isLoading}
        isLoading={isLoading}
      >
        Generate PDF
      </Button>
    </div>
  );
};
