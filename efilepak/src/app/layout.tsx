import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "eFile Pak — Simple tax return filing for Pakistan",
  description:
    "Answer a few questions, upload your documents, and we prepare and file your FBR income tax return for you.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
