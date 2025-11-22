"use client";

import { useState } from "react";
import { LoginForm, RegisterForm, OTPForm } from "./components/auth";
import {
  ThemeProvider,
  ThemeToggle,
  BackgroundEffects,
} from "./components/shared";
import { ROUTES } from "./lib/constants";

type Screen = (typeof ROUTES)[keyof typeof ROUTES];
type OTPContext = "login" | "register";

/**
 * Main App Component
 * Handles authentication flow routing
 */
export default function App() {
  const [screen, setScreen] = useState<Screen>(ROUTES.LOGIN);
  const [otpContext, setOtpContext] = useState<OTPContext>("login");
  const [userEmail, setUserEmail] = useState("");

  const handleLoginOTP = (email: string) => {
    setUserEmail(email);
    setOtpContext("login");
    setScreen(ROUTES.OTP);
  };

  const handleRegisterOTP = (email: string) => {
    setUserEmail(email);
    setOtpContext("register");
    setScreen(ROUTES.OTP);
  };

  const handleBackFromOTP = () => {
    setScreen(otpContext === "login" ? ROUTES.LOGIN : ROUTES.REGISTER);
  };

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      <div className="min-h-screen bg-gradient-to-b from-slate-100 via-slate-50 to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 flex items-center justify-center p-4 relative overflow-hidden">
        {/* Theme Toggle Button */}
        <ThemeToggle />

        {/* Background Effects */}
        <BackgroundEffects />

        {/* Main Content */}
        <div className="relative z-10 w-full max-w-sm">
          {screen === ROUTES.LOGIN && (
            <LoginForm
              onSwitchToRegister={() => setScreen(ROUTES.REGISTER)}
              onRequestOTP={handleLoginOTP}
            />
          )}
          {screen === ROUTES.REGISTER && (
            <RegisterForm
              onSwitchToLogin={() => setScreen(ROUTES.LOGIN)}
              onRequestOTP={handleRegisterOTP}
            />
          )}
          {screen === ROUTES.OTP && (
            <OTPForm
              email={userEmail}
              context={otpContext}
              onBack={handleBackFromOTP}
            />
          )}
        </div>
      </div>
    </ThemeProvider>
  );
}
