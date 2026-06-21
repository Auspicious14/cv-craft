import React from "react";
import Link from "next/link";

export const HomePage = () => {
  return (
    <>
      <section className="relative min-h-screen overflow-hidden px-4 text-slate-900 dark:text-slate-50">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.16),_transparent_34%),radial-gradient(circle_at_bottom_right,_rgba(14,165,233,0.14),_transparent_30%),linear-gradient(180deg,_#f8fafc_0%,_#eef2ff_100%)] dark:bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.18),_transparent_34%),radial-gradient(circle_at_bottom_right,_rgba(14,165,233,0.12),_transparent_30%),linear-gradient(180deg,_#020617_0%,_#0f172a_100%)]" />
        <div className="relative mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center text-center">
          <div className="mb-6 inline-flex items-center rounded-full border border-slate-200/80 bg-white/70 px-4 py-1 text-sm font-medium text-slate-600 shadow-sm backdrop-blur dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-300">
            Modern CV builder with AI-assisted writing
          </div>
          <h1 className="max-w-4xl text-5xl font-display font-semibold tracking-tight sm:text-6xl xl:text-7xl">
            Craft a CV that reads clean, confident, and current.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-300 sm:text-lg">
            Build, refine, and export a polished resume without the template-y
            look. Each step keeps the flow simple and the result professional.
          </p>
          <div className="mt-10 flex justify-center gap-4">
            <Link
              href="/cv/personal"
              className="inline-flex items-center justify-center rounded-lg bg-slate-900 px-8 py-3 text-base font-medium text-white shadow-lg shadow-slate-900/15 transition hover:-translate-y-0.5 hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:shadow-black/20 dark:hover:bg-slate-100"
            >
              Get Started
            </Link>
          </div>
        </div>
      </section>

      <section className="px-4 pb-20">
        <div className="mx-auto max-w-6xl rounded-3xl border border-slate-200/70 bg-white/80 px-6 py-16 shadow-[0_20px_80px_rgba(15,23,42,0.08)] backdrop-blur dark:border-slate-800 dark:bg-slate-900/70">
          <h2 className="text-center text-3xl font-display font-semibold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
            Why people keep coming back to it
          </h2>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {[
              {
                title: "Professional Templates",
                description:
                  "Choose from modern, ATS-friendly templates designed by experts",
                icon: "01",
              },
              {
                title: "Real-time Preview",
                description:
                  "See changes instantly with our live preview editor",
                icon: "02",
              },
              {
                title: "PDF Export",
                description:
                  "Download your CV as polished PDF ready for applications",
                icon: "03",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="group rounded-2xl border border-slate-200/80 bg-slate-50/80 p-8 transition duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-xl dark:border-slate-800 dark:bg-slate-950/40 dark:hover:bg-slate-900"
              >
                <div className="mb-8 inline-flex h-11 w-11 items-center justify-center rounded-full bg-slate-900 text-sm font-semibold text-white dark:bg-white dark:text-slate-900">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">
                  {feature.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="px-4 pb-12 text-slate-500 dark:text-slate-400">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 border-t border-slate-200 pt-8 text-center sm:flex-row dark:border-slate-800">
          <p>© 2024 CV Craft. All rights reserved.</p>
          <div className="flex justify-center gap-6 text-sm">
            <a href="#" className="transition-colors hover:text-slate-900 dark:hover:text-white">
              About
            </a>
            <a href="#" className="transition-colors hover:text-slate-900 dark:hover:text-white">
              Privacy
            </a>
            <a href="#" className="transition-colors hover:text-slate-900 dark:hover:text-white">
              Terms
            </a>
            <a href="#" className="transition-colors hover:text-slate-900 dark:hover:text-white">
              Contact
            </a>
          </div>
        </div>
      </footer>
    </>
  );
};
