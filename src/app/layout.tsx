import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import CustomCursor from "./components/CustomCursor";
import JoinNetworkPopup from "./components/JoinNetworkPopup";
import MotionEffects from "./components/MotionEffects";
import { MenuProvider } from "./components/MenuProvider";
import { getMenuProducts } from "./lib/products";
import { CONTACT, IS_INDEXABLE, SITE_NAME, SITE_URL, SOCIAL_LINKS } from "./lib/site";

// Fonts are self-hosted (src/app/fonts): no request to Google at build or run time,
// no layout shift, and one variable file per family covers every weight.
const fontHeading = localFont({
  src: "./fonts/Outfit-Variable.woff2",
  variable: "--font-heading",
  weight: "100 900",
  display: "swap",
});

const fontBody = localFont({
  src: "./fonts/PlusJakartaSans-Variable.woff2",
  variable: "--font-body",
  weight: "200 800",
  display: "swap",
});

const DEFAULT_DESCRIPTION =
  "ISO 13485:2016 certified maker of clear aligner and retainer sheets, 3D printing resins, thermoforming machines and orthodontic accessories, in 70+ countries.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Taglus | Aligner Sheets, 3D Printing Resins & Thermoforming Machines",
    template: "%s | Taglus",
  },
  description: DEFAULT_DESCRIPTION,
  applicationName: SITE_NAME,
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    locale: "en_US",
    url: "/",
    title: "Taglus | Aligner Sheets, 3D Printing Resins & Thermoforming Machines",
    description: DEFAULT_DESCRIPTION,
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Taglus aligner and retainer sheet boxes" }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@Taglus_Official",
    images: ["/og-image.jpg"],
  },
  // Previews and local builds are never indexed; production is (see lib/site.ts)
  robots: IS_INDEXABLE ? { index: true, follow: true } : { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#020612",
  colorScheme: "dark",
};

// Organization structured data: only facts that are shown on the site itself
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/logo-tuglas.png`,
  email: CONTACT.email,
  telephone: CONTACT.phone,
  address: { "@type": "PostalAddress", ...CONTACT.address },
  sameAs: SOCIAL_LINKS,
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  // Products for the header menu (managed in the CMS). Refreshed whenever the CMS saves.
  const menuProducts = await getMenuProducts();

  return (
    <html
      lang="en"
      className={`${fontHeading.variable} ${fontBody.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col bg-[#020612] text-[#E8DCC8] overflow-x-hidden">
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <script
          type="application/ld+json"
          // Static object defined above, no user input
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <CustomCursor />
        <MenuProvider products={menuProducts}>{children}</MenuProvider>
        <JoinNetworkPopup />
        <MotionEffects />
      </body>
    </html>
  );
}
