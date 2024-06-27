import "./globals.css";
import { Navbar } from "./component/Navbar";
import { Martian_Mono } from "next/font/google";
const font = Martian_Mono ({ subsets: ["latin"], weight: ["200","400","500","600", "700"] });
import 'react-toastify/dist/ReactToastify.css';

export const metadata = {
  title: "MODEO PMIS",
  description: "DPWH MODEO Project Management Information System",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${font.className} flex flex-col w-screen h-screen`}>
        <Navbar /> 
        <main>
        {children}
        </main>
      </body>
    </html>
  );
}
