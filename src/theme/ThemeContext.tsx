// context/ThemeContext.tsx
import React, { createContext, useContext, useState, useEffect } from "react";
import { Appearance, useColorScheme } from "react-native";
import { light, dark } from "../theme/colors";

type ThemeType = "light" | "dark";

type ThemeContextType = {
  themeMode: ThemeType; 
  theme: typeof light;   
  isDark: boolean;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  
  const systemColorScheme = useColorScheme();
  const [themeMode, setThemeMode] = useState<ThemeType>(
    systemColorScheme === "dark" ? "dark" : "light"
  );

  useEffect(() => {
    setThemeMode(systemColorScheme === "dark" ? "dark" : "light");
  }, [systemColorScheme]);

  const toggleTheme = () => {
    setThemeMode((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const activeTheme = themeMode === "dark" ? dark : light;
  const isDark = themeMode === "dark";

  return (
    <ThemeContext.Provider value={{ themeMode, theme: activeTheme, isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within a ThemeProvider");
  return context;
};