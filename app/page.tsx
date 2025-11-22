import AuthExperience from "@/App";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "KIIBORD | Tournament Auth Portal",
  description:
    "Secure OTP-based authentication for KIIBORD, the eSports tournament hub.",
};

export default function Page() {
  return (
    <main className="relative isolate min-h-screen bg-slate-950">
      <section className="sr-only" aria-live="polite">
        <h1>OTP-secured KIIBORD authentication</h1>
        <p>
          Enter KIIBORD, the operations platform for eSports tournaments,
          through a passwordless email-and-code experience.
        </p>
      </section>
      <AuthExperience />
    </main>
  );
}
