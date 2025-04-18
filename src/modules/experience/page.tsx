import React from "react";
import { Formik, FieldArray, Field } from "formik";
import { useExperience } from "./context";
import { TextInput, Button, AIEnhanceButton } from "../../components";
import { TrashIcon } from "@heroicons/react/24/outline";

export default function ExperiencePage() {
  const { experiences, isLoading, saveExperience, fetchExperiences } =
    useExperience();

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Professional Experience</h1>
      <Formik
        initialValues={{
          entries:
            experiences?.length > 0
              ? experiences
              : [
                  {
                    company: "",
                    description: "",
                    jobTitle: "",
                    location: "",
                    fromDate: "",
                    toDate: "",
                  },
                ],
        }}
        onSubmit={async (values, actions) => {
          await saveExperience(values.entries, actions);
          await fetchExperiences();
        }}
      >
        {({ handleSubmit, isSubmitting, values, setFieldValue }) => (
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
                          name={`entries.${index}.company`}
                          as={TextInput}
                          label="Company Name"
                          required
                        />
                        <Field
                          name={`entries.${index}.jobTitle`}
                          as={TextInput}
                          label="Position"
                          required
                        />
                        <Field
                          name={`entries.${index}.location`}
                          as={TextInput}
                          label="Location"
                          required
                        />
                        <Field
                          name={`entries.${index}.fromDate`}
                          as={TextInput}
                          type="date"
                          label="Start Date"
                          required
                        />
                        <Field
                          name={`entries.${index}.toDate`}
                          as={TextInput}
                          type="date"
                          label="End Date"
                          required
                        />
                        <div>
                          <Field
                            name={`entries.${index}.description`}
                            as={TextInput}
                            label="Responsibilities"
                            textarea
                          />
                          <AIEnhanceButton
                            content=""
                            section="experience"
                            onEnhanced={(enhanced) =>
                              setFieldValue("description", enhanced)
                            }
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                  <Button
                    type="button"
                    onClick={() =>
                      push({
                        companyName: "",
                        position: "",
                        startDate: "",
                        endDate: "",
                        responsibilities: "",
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
                Save Experience
              </Button>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
}
