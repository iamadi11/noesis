export const metadata = {
  title: "Geo Risk Triage",
  description: "Upload a schedule, ask a plain-English risk question, get a ranked answer.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ fontFamily: "system-ui, sans-serif", margin: 0, padding: "2rem", maxWidth: 720 }}>
        {children}
      </body>
    </html>
  );
}
