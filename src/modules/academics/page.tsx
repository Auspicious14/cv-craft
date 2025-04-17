import React from "react";
import { Formik, FieldArray, Field } from "formik";
import { useAcademy } from "./context";
import { TextInput, Button } from "../../components";
import { TrashIcon } from "@heroicons/react/24/outline";
import { IAcademy } from "./model";

export default function AcademicsPage() {
  const { academics, isLoading, saveAcademics, fetchAcademics } = useAcademy();

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Academic Qualifications</h1>
      <Formik
        initialValues={{
          entries:
            academics.length > 0
              ? academics
              : [{ institution: "", degree: "", startDate: "", endDate: "" }],
        }}
        onSubmit={async (values, actions) => {
          await saveAcademics(values.entries as IAcademy[], actions);
          await fetchAcademics();
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
                          name={`entries.${index}.institution`}
                          as={TextInput}
                          label="Institution"
                          required
                        />
                        <Field
                          name={`entries.${index}.degree`}
                          as={TextInput}
                          label="Degree"
                          required
                        />
                        <Field
                          name={`entries.${index}.startDate`}
                          as={TextInput}
                          type="date"
                          label="Start Date"
                          required
                        />
                        <Field
                          name={`entries.${index}.endDate`}
                          as={TextInput}
                          type="date"
                          label="End Date"
                          required
                        />
                      </div>
                    </div>
                  ))}
                  <Button
                    type="button"
                    onClick={() =>
                      push({
                        institution: "",
                        degree: "",
                        startDate: "",
                        endDate: "",
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
                Save Academics
              </Button>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
}
