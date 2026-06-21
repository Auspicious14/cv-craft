import { Formik } from "formik";
import { useAuth } from "../context";
import { Button, TextInput } from "../../../components";
import Link from "next/link";
import * as Yup from "yup";
import toast from "react-hot-toast";
import React from "react";

export default function SignInPage() {
  const { signIn, isLoading } = useAuth();

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string().required("Required"),
  });

  return (
    <div className="min-h-screen px-4 py-10 text-slate-900 dark:text-slate-50 bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.12),_transparent_32%),radial-gradient(circle_at_bottom_right,_rgba(14,165,233,0.12),_transparent_30%),linear-gradient(180deg,_#f8fafc_0%,_#eef2ff_100%)] dark:bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.16),_transparent_32%),radial-gradient(circle_at_bottom_right,_rgba(14,165,233,0.12),_transparent_30%),linear-gradient(180deg,_#020617_0%,_#0f172a_100%)]">
      <div className="mx-auto grid min-h-[calc(100vh-5rem)] w-full max-w-5xl items-center lg:grid-cols-[1.05fr_0.95fr]">
        <div className="hidden h-full flex-col justify-between rounded-[2rem] border border-slate-200/80 bg-white/70 p-8 shadow-[0_20px_80px_rgba(15,23,42,0.08)] backdrop-blur lg:flex dark:border-slate-800 dark:bg-slate-900/70">
          <div>
            <div className="mb-6 inline-flex rounded-full border border-slate-200 bg-white px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 dark:border-slate-700 dark:bg-slate-950/50 dark:text-slate-300">
              Secure access
            </div>
            <h1 className="max-w-md text-4xl font-display font-semibold tracking-tight text-slate-900 dark:text-white">
              Welcome back. Pick up where you left off.
            </h1>
            <p className="mt-4 max-w-md text-sm leading-6 text-slate-600 dark:text-slate-300">
              Your drafts, AI suggestions, and exported CVs stay in one flow so
              you can keep moving without redoing the setup.
            </p>
          </div>
          <div className="grid gap-3 text-sm text-slate-600 dark:text-slate-300">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 dark:border-slate-800 dark:bg-slate-950/40">
              Fast sign in, smooth routing, no extra steps.
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 dark:border-slate-800 dark:bg-slate-950/40">
              Edit, enhance, and export from the same workspace.
            </div>
          </div>
        </div>

        <div className="mx-auto w-full max-w-md rounded-[2rem] border border-slate-200/80 bg-white/85 p-8 shadow-[0_24px_90px_rgba(15,23,42,0.12)] backdrop-blur dark:border-slate-800 dark:bg-slate-900/85">
          <div className="mb-8 text-center lg:text-left">
            <h2 className="text-3xl font-display font-semibold tracking-tight text-slate-900 dark:text-white">
              Sign in
            </h2>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
              Continue with your CV workspace.
            </p>
          </div>
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={validationSchema}
          onSubmit={(values, actions) => {
            signIn(values, actions).catch(() => {
              toast.error("Sign in failed");
            });
          }}
        >
          {({ handleSubmit, handleChange, values }) => (
            <form onSubmit={handleSubmit} className="space-y-4">
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
                isLoading={isLoading}
              >
                Sign In
              </Button>
            </form>
          )}
        </Formik>
        <div className="mt-6 space-y-2 text-center text-sm">
          <Link
            href="/forgot-password"
            className="text-slate-600 transition hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
          >
            Forgot password?
          </Link>
          <p className="text-slate-600 dark:text-slate-300">
            Don't have an account?{" "}
            <Link
              href="/signup"
              className="font-medium text-slate-900 transition hover:underline dark:text-white"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
      </div>
    </div>
  );
}
