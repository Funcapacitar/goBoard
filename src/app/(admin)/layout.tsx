import { Karla } from "next/font/google";
import { SideBar } from "@/components/sidebar";
import Header from "@/components/header";
import PageWrapper from "@/components/pagewrapper";
import { ThemeProvider } from "@/components/theme-provider";
import { Metadata } from "next";

const karla = Karla({
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-karla",
});
export const metadata: Metadata = {
  title: "Presidium - Dashboard",
  description: "Admin",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider
      themes={["dark", "custom", "light"]}
      attribute="class"
      enableSystem
      disableTransitionOnChange
    >
      <>
        <SideBar />
        <div className="flex flex-col h-full w-full">
          <Header />
          <PageWrapper>{children}</PageWrapper>
        </div>
      </>
    </ThemeProvider>
  );
}
