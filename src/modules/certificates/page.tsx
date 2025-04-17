import React from "react";
import { Formik, FieldArray, Field } from "formik";
import { TextInput, Button } from "../../components";
import { useCertificateState } from "./context";
import { TrashIcon } from "@heroicons/react/24/outline";

export default function CertificatesPage() {
  const { certificates, isLoading, saveCertificates } = useCertificateState();

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Certifications</h1>
      <Formik
        initialValues={{
          entries:
            certificates?.length > 0
              ? certificates
              : [{ description: "", name: "", year: "", school: "" }],
        }}
        onSubmit={async (values, actions) => {
          await saveCertificates(values.entries, actions);
        }}
      >
        {({ handleSubmit, isSubmitting, values }) => (
          <form onSubmit={handleSubmit} className="space-y-4">
            <FieldArray name="entries">
              {({ push, remove }) => (
                <div className="space-y-6">
                  {values.entries.map((_, index) => (
                    <div key={index} className="border p-4 rounded-lg">
                      <div className="flex justify-end mb-2">
                        <Button
                          type="button"
                          variant="transparent"
                          onClick={() => remove(index)}
                          disabled={index === 0}
                        >
                          <TrashIcon className="h-5 w-5 text-red-500" />
                        </Button>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <Field
                          name={`entries.${index}.certificateName`}
                          as={TextInput}
                          label="Certificate Name"
                          required
                        />
                        <Field
                          name={`entries.${index}.issuingOrganization`}
                          as={TextInput}
                          label="Issuing Organization"
                          required
                        />
                        <Field
                          name={`entries.${index}.dateObtained`}
                          as={TextInput}
                          type="date"
                          label="Date Obtained"
                          required
                        />
                      </div>
                    </div>
                  ))}
                  <Button
                    type="button"
                    onClick={() =>
                      push({
                        certificateName: "",
                        issuingOrganization: "",
                        dateObtained: "",
                      })
                    }
                  >
                    Add Entry
                  </Button>
                </div>
              )}
            </FieldArray>
            <div className="mt-8">
              <Button
                type="submit"
                disabled={isSubmitting || isLoading}
                isLoading={isSubmitting || isLoading}
              >
                Save Certificates
              </Button>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
}
