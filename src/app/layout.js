import "./globals.css";
import LayoutWrapper from "../../components/LayoutWrapper";
import AuthProvider from "../../Context/AuthProvider";
import { Toaster } from "react-hot-toast";
import Script from "next/script";
import WattsAppButton from "../../components/WattsAppButton";
import Provider from "../../Context/Provider";
import QueryProvider from "../../Context/QueryProvider";
import { FilterProvider } from "../../Context/FilterContext";
import GeminiButton from "../../components/ChatGPT/GeminiButton";
import { Roboto } from "next/font/google";
import newarrivalData from "../../lib/newarrival";
const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});



async function getFilterData() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL_ALL}find-productAttributes`,
      { next: { revalidate: 10 } }
    );
    if (!res.ok) {
      throw new Error(`Failed to fetch filter attributes: ${res.status}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    return [];
  }
}
export const metadata = {
  title: "Ayira",
  description: "A Modern Ecommerce Platform",
  icons: {
    icon: "/WhatsApp Image 2025-09-04 at 10.49.24 PM.jpeg",
  },
};

export default async function RootLayout({ children }) {
  const data = await newarrivalData();
  const filterAttributes = await getFilterData();

  return (
    <html lang="en">
      <body className={`${roboto.variable} antialiased`}>
        <QueryProvider>
          <Provider>
            <AuthProvider filterAttributes={filterAttributes} data={data}>
              <FilterProvider>
                <LayoutWrapper>{children}</LayoutWrapper>
                <Toaster position="top-right" reverseOrder={false} />
                <WattsAppButton />
                <GeminiButton />
              </FilterProvider>
            </AuthProvider>
          </Provider>
        </QueryProvider>
        <Script id="google-translate-init" strategy="afterInteractive">
          {`
            function googleTranslateElementInit() {
              new google.translate.TranslateElement({ pageLanguage: 'en' }, 'google_translate_element');
            }
          `}
        </Script>
        <Script
          id="google-translate-api"
          strategy="afterInteractive"
          src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
        />
      </body>
    </html>
  );
}
