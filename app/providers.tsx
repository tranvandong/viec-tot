"use client";

import { SessionProvider } from "next-auth/react";
import { Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <Theme
        appearance="light"
        accentColor="blue"
        grayColor="slate"
        scaling="100%"
      >
        {children}
      </Theme>
    </SessionProvider>
  );
}
