import React from "react";
import { Formik, FieldArray, Field } from "formik";
import { useSkill } from "./context";
import { TextInput, Button } from "../../components";
import { TrashIcon } from "@heroicons/react/24/outline";
import { ISkill } from "./model";
import * as Yup from "yup";

const FormSchema = Yup.object().shape({
  name: Yup.string().required("Skill is required"),
});

export default function SkillsPage() {
  const { skills, isLoading, saveSkills, fetchSkills } = useSkill();

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Skills & Competencies</h1>
      <Formik
        initialValues={{
          entries: skills?.length > 0 ? skills : [{ name: "" }],
        }}
        // validationSchema={FormSchema}
        onSubmit={async (values, actions) => {
          await saveSkills(values.entries as ISkill[], actions);
          await fetchSkills();
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
                          name={`entries.${index}.name`}
                          as={TextInput}
                          label="Skill Name"
                          required
                        />
                      </div>
                    </div>
                  ))}
                  <Button
                    type="button"
                    onClick={() =>
                      push({
                        name: "",
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
                Save Skills
              </Button>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
}
