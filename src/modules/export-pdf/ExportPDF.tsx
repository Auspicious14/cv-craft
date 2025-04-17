import { useEffect, useState } from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { Button } from "../../components";
import CVTemplate from "./templates/DefaultTemplate";

export default function ExportPDF() {
  const [cvData, setCvData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/export-cv");
        const data = await response.json();
        setCvData(data);
      } catch (error) {
        console.error("Error fetching CV data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading CV data...</div>;

  return (
    <div className="max-w-2xl mx-auto p-4">
      <PDFDownloadLink
        document={<CVTemplate data={cvData} />}
        fileName="cv-template.pdf"
      >
        {({ loading: pdfLoading }) => (
          <Button
            variant="primary"
            disabled={pdfLoading || loading}
            isLoading={pdfLoading || loading}
          >
            {pdfLoading ? "Generating PDF..." : "Download CV"}
          </Button>
        )}
      </PDFDownloadLink>
    </div>
  );
}
