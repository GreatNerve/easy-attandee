import { NAV_THEME } from "@/lib/theme";
import { ThemeProvider } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";

export const AppThemeProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <ThemeProvider value={NAV_THEME.dark}>
      {children}
      <StatusBar style="dark" />
    </ThemeProvider>
  );
};
