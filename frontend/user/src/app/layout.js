import { DM_Sans } from 'next/font/google'
import "./globals.css";
import Navbar from '@/components/system/Navbar';
import { ThemeProvider } from '@/providers/theme-provider';

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
          <Navbar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
