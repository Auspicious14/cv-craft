import React from "react";
import { Button } from "../../components";
import Link from "next/link";

export const HomePage = () => {
  return (
    <>
      <section className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 text-white px-4">
        <div className="max-w-6xl mx-auto flex flex-col h-screen justify-center items-center text-center">
          <h1 className="text-6xl xl:text-9xl font-bold mb-6 animate-fade-in-up">
            Craft Your Perfect CV
          </h1>
          <p className="text-xl mb-8 text-gray-200">
            Create professional resumes in minutes with our intuitive builder
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/cv/personal">
              <Button variant="primary" className="px-8 py-3 text-lg">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-gray-50 dark:bg-slate-800/50 rounded-2xl">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-800 dark:text-white">
            Why Choose CV Craft?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Professional Templates",
                description:
                  "Choose from modern, ATS-friendly templates designed by experts",
                icon: "🎨",
              },
              {
                title: "Real-time Preview",
                description:
                  "See changes instantly with our live preview editor",
                icon: "👁️",
              },
              {
                title: "PDF Export",
                description:
                  "Download your CV as polished PDF ready for applications",
                icon: "📄",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl hover:bg-gray-50 
                dark:bg-slate-700 dark:shadow-slate-900/30 dark:hover:bg-slate-600 
                transition-all duration-300 ease-in-out"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-2xl font-bold mb-4 text-slate-900 dark:text-slate-100 ">
                  {feature.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-300">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="bg-gray-900 text-gray-300 py-12 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <p className="mb-4">© 2024 CV Craft. All rights reserved.</p>
          <div className="flex justify-center space-x-6">
            <a href="#" className="hover:text-white transition-colors">
              About
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Privacy
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Terms
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Contact
            </a>
          </div>
        </div>
      </footer>
    </>
  );
};
