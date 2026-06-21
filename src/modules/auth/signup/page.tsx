import { Formik } from "formik";
import { useAuth } from "../context";
import { Button, TextInput } from "../../../components";
import Link from "next/link";
import * as Yup from "yup";
import toast from "react-hot-toast";
import React from "react";

export default function SignUpPage() {
  const { signUp, isLoading } = useAuth();

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string().min(8, "Too short!").required("Required"),
  });

  return (
    <div className="min-h-screen px-4 py-10 text-slate-900 dark:text-slate-50 bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.12),_transparent_32%),radial-gradient(circle_at_bottom_right,_rgba(14,165,233,0.12),_transparent_30%),linear-gradient(180deg,_#f8fafc_0%,_#eef2ff_100%)] dark:bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.16),_transparent_32%),radial-gradient(circle_at_bottom_right,_rgba(14,165,233,0.12),_transparent_30%),linear-gradient(180deg,_#020617_0%,_#0f172a_100%)]">
      <div className="mx-auto grid min-h-[calc(100vh-5rem)] w-full max-w-5xl items-center lg:grid-cols-[0.95fr_1.05fr]">
        <div className="hidden h-full flex-col justify-between rounded-[2rem] border border-slate-200/80 bg-white/70 p-8 shadow-[0_20px_80px_rgba(15,23,42,0.08)] backdrop-blur lg:flex dark:border-slate-800 dark:bg-slate-900/70">
          <div>
            <div className="mb-6 inline-flex rounded-full border border-slate-200 bg-white px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 dark:border-slate-700 dark:bg-slate-950/50 dark:text-slate-300">
              Create workspace
            </div>
            <h1 className="max-w-md text-4xl font-display font-semibold tracking-tight text-slate-900 dark:text-white">
              Make an account and keep every CV draft in sync.
            </h1>
            <p className="mt-4 max-w-md text-sm leading-6 text-slate-600 dark:text-slate-300">
              Store personal info, experience, and AI-enhanced copy in one place
              without losing the thread between sessions.
            </p>
          </div>
          <div className="grid gap-3 text-sm text-slate-600 dark:text-slate-300">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 dark:border-slate-800 dark:bg-slate-950/40">
              Quick onboarding, no cluttered setup.
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 dark:border-slate-800 dark:bg-slate-950/40">
              Access your exports and revisions from anywhere.
            </div>
          </div>
        </div>

        <div className="mx-auto w-full max-w-md rounded-[2rem] border border-slate-200/80 bg-white/85 p-8 shadow-[0_24px_90px_rgba(15,23,42,0.12)] backdrop-blur dark:border-slate-800 dark:bg-slate-900/85">
          <div className="mb-8 text-center lg:text-left">
            <h2 className="text-3xl font-display font-semibold tracking-tight text-slate-900 dark:text-white">
              Create account
            </h2>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
              Start building your CV workspace.
            </p>
          </div>
        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            email: "",
            password: "",
          }}
          validationSchema={validationSchema}
          onSubmit={(values, actions) => {
            signUp(values, actions).catch(() => {
              toast.error("Signup failed");
            });
          }}
        >
          {({ handleSubmit, handleChange, values }) => (
            <form onSubmit={handleSubmit} className="space-y-4">
              <TextInput
                label="First Name"
                name="firstName"
                type="text"
                onChange={handleChange}
                value={values.firstName}
                placeholder="Enter your email"
              />
              <TextInput
                label="Last Name"
                name="lastName"
                type="text"
                onChange={handleChange}
                value={values.lastName}
                placeholder="Enter your email"
              />

              <TextInput
                label="Email"
                name="email"
                type="email"
                onChange={handleChange}
                value={values.email}
                placeholder="Enter your email"
              />
              <TextInput
                label="Password"
                name="password"
                type="password"
                onChange={handleChange}
                value={values.password}
                placeholder="••••••••"
              />
              <Button
                type="submit"
                className="w-full bg-slate-900 text-white hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100"
                disabled={isLoading}
              >
                {isLoading ? "Creating account..." : "Sign Up"}
              </Button>
            </form>
          )}
        </Formik>
        <p className="mt-6 text-center text-sm text-slate-600 dark:text-slate-300">
          Already have an account?{" "}
          <Link
            href="/signin"
            className="font-medium text-slate-900 transition hover:underline dark:text-white"
          >
            Sign In
          </Link>
        </p>
      </div>
      </div>
    </div>
  );
}
