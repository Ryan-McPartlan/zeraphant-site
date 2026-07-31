import "~/styles/globals.css";

import { type Metadata } from "next";
import {
  Annie_Use_Your_Telescope,
  Bricolage_Grotesque,
  Metal_Mania,
  Nunito,
} from "next/font/google";

import { SiteShell } from "~/components/site-shell";
import { TRPCReactProvider } from "~/trpc/react";

export const metadata: Metadata = {
  title: {
    default: "Zeraphant",
    template: "%s · Zeraphant",
  },
  description: "Ryan's personal site",
  icons: [
    { rel: "icon", url: "/zeraph.png", type: "image/png" },
    { rel: "apple-touch-icon", url: "/zeraph.png" },
  ],
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

const connectionHand = Annie_Use_Your_Telescope({
  subsets: ["latin"],
  variable: "--font-annie",
  weight: "400",
});

const passionDisplay = Metal_Mania({
  subsets: ["latin"],
  variable: "--font-metal",
  weight: "400",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${sans.variable} ${connectionHand.variable} ${passionDisplay.variable}`}
    >
      <body>
        <TRPCReactProvider>
          <SiteShell>{children}</SiteShell>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
