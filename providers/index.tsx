import { AuthProvider } from "./AuthProvider";
import { AppThemeProvider } from "./ThemeProvider";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <AuthProvider>
      <AppThemeProvider>{children}</AppThemeProvider>
    </AuthProvider>
  );
};
