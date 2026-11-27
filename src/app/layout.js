import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import ThemeProvider from "@/components/theme-provider";

// The one font of the whole project
const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
});

export const metadata = {
  title: "UniRequest | University Request & Approval Portal",
  description: "Submit university requests online and track every step.",
};

const RootLayout = ({ children }) => {
  return (
    // suppressHydrationWarning is needed by next-themes (it sets the theme class on <html>)
    <html lang="en" suppressHydrationWarning className={`${jakarta.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
          <Toaster position="top-center" richColors />
        </ThemeProvider>
      </body>
    </html>
  );
};

export default RootLayout;