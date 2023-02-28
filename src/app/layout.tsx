import "../styles/globals.css";
import { NavBar } from "./navBar";

export default function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      className="bg-white text-black dark:bg-[#111010] dark:text-white"
      lang="en"
    >
      <body>
        <NavBar />
        <main className="flex min-h-screen flex-col items-center justify-center">
          {children}
        </main>
      </body>
    </html>
  );
}
