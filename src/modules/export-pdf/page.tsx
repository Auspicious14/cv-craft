import React, { useEffect, useState } from "react";
import { useExportPdf } from "./context";
import { ClassicTemplate } from "./templates/classic";
import { ModernTemplate } from "./templates/modern";
import { Button, TemplateSkeleton } from "../../components";
import { useRouter } from "next/navigation";

export const PreviewPage = () => {
  const router = useRouter();
  const { getCV, cv, isLoading, saveExportPdf } = useExportPdf();
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);

  useEffect(() => {
    const storedCvId = localStorage.getItem("cvId");
    console.log("storedCvId", storedCvId);
    if (!storedCvId) {
      console.error("No CV found in storage");
      router.push("/");
    }

    if (!cv) {
      getCV();
    }
  }, [getCV, cv]);
  console.log("cv", cv);
  const handleGeneratePdf = async () => {
    await saveExportPdf(selectedTemplate.toLowerCase());
  };

  const templates = [
    {
      name: "Modern",
      compnent: isLoading ? <TemplateSkeleton /> : <ModernTemplate cv={cv} />,
    },
    {
      name: "Classic",
      compnent: isLoading ? <TemplateSkeleton /> : <ClassicTemplate cv={cv} />,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-center mb-2">
        Select a Resume Template
      </h1>
      {selectedTemplate === null && (
        <p className="text-center my-6 mb-2 text-gray-500">
          Click a template to select and enable download
        </p>
      )}
      <p className="text-sm my-2 text-red-500 text-center italic">
        Note: Resumes created are deleted in the next 24hrs. Download now!
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {templates.map((template, index) => (
          <div
            key={index}
            className={`border rounded-2xl shadow-sm p-4 transition hover:shadow-lg ${
              selectedTemplate === template.name ? "ring-2 ring-blue-500" : ""
            }`}
            onClick={() => setSelectedTemplate(template.name)}
          >
            <h2 className="text-xl font-semibold mt-4">{template.name}</h2>
            {template?.compnent}
          </div>
        ))}
      </div>
      {selectedTemplate !== null && (
        <Button
          isLoading={isLoading}
          disabled={isLoading}
          variant="primary"
          className="flex justify-center items-center my-4"
          onClick={handleGeneratePdf}
        >
          Generate PDF
        </Button>
      )}
    </div>
  );
};
