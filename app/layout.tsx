import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "BaseScoreNFT",
  description: "Claim your onchain achievement badge.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* BASE_APP_ID_PLACEHOLDER */}
        <meta name="base:app_id" content="69cb29f5a7654b8774320f1c" />
        {/* TALENT_VERIFICATION_PLACEHOLDER */}
        <meta
          name="talentapp:project_verification"
          content="8714524b3bb9b8f5c7e4912e5461faf6dab37b4108ac976e21c276fe9b21c5374466fa931f71ba4dc2e16a48e9081649c555863abddace892bec80dceb466384"
        />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

