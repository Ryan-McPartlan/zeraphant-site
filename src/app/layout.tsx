import "~/styles/globals.css";

import { type Metadata } from "next";
import { Bricolage_Grotesque, Nunito } from "next/font/google";

import { SiteShell } from "~/components/site-shell";
import { TRPCReactProvider } from "~/trpc/react";

export const metadata: Metadata = {
  title: {
    default: "Zeraphant",
    template: "%s · Zeraphant",
  },
  description: "A personal site with too much personality and a weird cursor.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  weight: ["500", "700", "800"],
});

const sans = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
  weight: ["400", "600", "700"],
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <body>
        <TRPCReactProvider>
          <SiteShell>{children}</SiteShell>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
