export const metadata = {
  title: 'Propkads - Real Estate Sales Revenue System',
  description: 'Sell Your Real Estate Inventory With a Complete Revenue System',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  );
}
