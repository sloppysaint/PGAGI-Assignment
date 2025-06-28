import { useTheme as useNextTheme } from "next-themes"

export const useTheme = () => {
  const { theme, setTheme, systemTheme } = useNextTheme()
  
  return {
    theme,
    setTheme,
    systemTheme,
    isDark: theme === "dark",
    isLight: theme === "light",
    isSystem: theme === "system",
  }
}