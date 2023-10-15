import { Raleway } from "next/font/google";
import "./global.css";

const raleway = Raleway({
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className={raleway.className}>
      <body>{children}</body>
    </html>
  );
}
