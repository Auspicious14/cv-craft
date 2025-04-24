import { Formik } from "formik";
import { TextInput, Button, AIEnhanceButton } from "../../components";
import { usePersonalInfo } from "./context";
import React from "react";

export default function PersonalInfoPage() {
  const { personalInfo, isLoading, savePersonalInfo } = usePersonalInfo();

  return (
    <>
      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
          Personal Information
        </h1>
        <Formik
          initialValues={{
            firstName: personalInfo?.firstName || "",
            lastName: personalInfo?.lastName || "",
            email: personalInfo?.email || "",
            description: personalInfo?.description || "",
            address: personalInfo?.address || "",
            profession: personalInfo?.profession || "",
            phoneNumber: personalInfo?.phoneNumber || "",
            state: personalInfo?.state || "",
            city: personalInfo?.city || "",
            country: personalInfo?.country || "",
          }}
          onSubmit={savePersonalInfo}
        >
          {(formik) => (
            <form onSubmit={formik.handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <TextInput
                  label="First Name"
                  name="firstName"
                  placeholder="John"
                />
                <TextInput
                  label="Last Name"
                  name="lastName"
                  placeholder="Doe"
                />
                <TextInput
                  label="Email"
                  name="email"
                  type="email"
                  placeholder="john@example.com"
                />
                <TextInput
                  label="Phone Number"
                  name="phoneNumber"
                  placeholder="+1 (555) 000-0000"
                />
                <TextInput
                  label="Profession"
                  name="profession"
                  placeholder="Software Developer"
                />
                <TextInput
                  label="Address"
                  name="address"
                  placeholder="New York, USA"
                />
                <TextInput label="City" name="city" placeholder="Ilorin" />
                <TextInput
                  label="State"
                  name="state"
                  placeholder="Kwara State"
                />
                <TextInput
                  label="Country"
                  name="country"
                  placeholder="Nigeria"
                />
              </div>

              <TextInput
                label="Professional Summary"
                name="description"
                value={formik.values.description}
                type="textarea"
                // rows={4}
              />
              <AIEnhanceButton
                content="Professional Summary"
                section="personal"
                onEnhanced={(enhanced) => {
                  formik.setFieldValue("description", enhanced);
                }}
              />

              <div className="flex justify-end">
                <Button
                  type="submit"
                  variant="primary"
                  isLoading={formik.isSubmitting || isLoading}
                  disabled={!formik.dirty || formik.isSubmitting}
                >
                  Save Information
                </Button>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </>
  );
}
