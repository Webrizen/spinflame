import { DM_Sans } from 'next/font/google'
import "./globals.css";
import Navbar from '@/components/system/Navbar';
import { ThemeProvider } from '@/providers/theme-provider';
import { Toaster } from "@/components/ui/toaster"
import AuthProvider from '@/providers/AuthProvider';
import NextTopLoader from 'nextjs-toploader';

const dmSans = DM_Sans({ subsets: ["latin"] });

export const metadata = {
  title: "SpinFlame - Real-time Event Hosting Platform",
  description: "SpinFlame is a real-time event hosting platform for content creators. Host challenges, giveaways, and more using interactive spin wheel games. No login required for participants.",
  keywords: "SpinFlame, event hosting, real-time, spin wheel games, challenges, giveaways, content creators, web application, Node.js, Express.js, MongoDB, Socket.io, Next.js"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={dmSans.className} suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
        >
          <AuthProvider>
            <NextTopLoader
              color="#2299DD"
              initialPosition={0.08}
              crawlSpeed={200}
              height={3}
              crawl={true}
              easing="ease"
              speed={200}
              shadow="0 0 10px #2299DD,0 0 5px #2299DD"
              template='<div class="bar" role="bar"><div class="peg"></div></div> 
  <div class="spinner" role="spinner"><div class="spinner-icon"></div></div>'
              zIndex={1600}
              showAtBottom={false}
            />
            <Navbar />
            {children}
            <Toaster />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
