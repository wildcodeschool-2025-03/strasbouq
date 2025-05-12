import { createContext, useContext, useState } from "react";
import type { Dispatch, ReactNode, SetStateAction } from "react";

interface ThemeProviderProps {
  children: ReactNode;
}

interface ThemeContextType {
  theme: string;
  setTheme: Dispatch<SetStateAction<string>>;
}

export const ThemeContext = createContext<ThemeContextType | null>(null);

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setTheme] = useState("light");
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const setDarkMode = () => {
  const value = useContext(ThemeContext);

  if (value == null) {
    throw new Error("useTheme has to be used within <ThemeProvider>");
  }

  return value;
};
