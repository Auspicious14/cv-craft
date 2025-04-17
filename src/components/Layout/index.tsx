import { useState, createContext, useContext, useEffect } from "react";
import { Switch } from "@headlessui/react";
import { SunIcon, MoonIcon } from "@heroicons/react/24/outline";

type ThemeContextType = {
  darkMode: boolean;
  toggleTheme: () => void;
};

export const ThemeContext = createContext<ThemeContextType>({
  darkMode: false,
  toggleTheme: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle("dark", savedTheme === "dark");
    } else {
      localStorage.setItem("theme", "light");
    }
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => {
      const newTheme = prev === "light" ? "dark" : "light";
      localStorage.setItem("theme", newTheme);
      document.documentElement.classList.toggle("dark", newTheme === "dark");
      return newTheme;
    });
  };

  return (
    <ThemeContext.Provider value={{ darkMode: theme === "dark", toggleTheme }}>
      <div
        className={`min-h-screen transition-colors duration-300 ${
          theme === "dark" ? "dark" : ""
        }`}
      >
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}

export default function Layout({ children }: { children: React.ReactNode }) {
  const { darkMode, toggleTheme } = useTheme();

  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur border-b border-slate-200 dark:border-slate-800 z-50">
        <nav className="container py-4 flex justify-between items-center">
          <h1 className="text-xl font-display font-semibold text-primary-600 dark:text-primary-400">
            CV Craft
          </h1>
          <Switch
            checked={darkMode}
            onChange={toggleTheme}
            className="relative inline-flex h-6 w-11 items-center rounded-full"
          >
            <span className="sr-only">Toggle dark mode</span>
            <span
              className={`${
                darkMode ? "translate-x-6" : "translate-x-1"
              } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
            >
              {darkMode ? (
                <MoonIcon className="w-3 h-3 text-slate-900" />
              ) : (
                <SunIcon className="w-3 h-3 text-slate-900" />
              )}
            </span>
          </Switch>
        </nav>
      </header>
      <main className="flex-1">{children}</main>
    </div>
  );
}
