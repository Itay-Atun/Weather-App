import "./globals.css";
import Image from "next/image";
import { background } from "../public/images";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className=" relative w-screen h-screen flex justify-center items-center">
          <Image
            src={background}
            layout="fill"
            objectFit="cover"
            alt="Weather background"
            className="absolute inset-0 -z-10" // Push background behind everything
          />
          {children}
        </div>
      </body>
    </html>
  );
}
