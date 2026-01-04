export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100">
      {children}
    </main>
  );
}
