export default function UsersLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen w-screen items-center justify-center px-4">
      <main className="mx-auto max-w-sm">{children}</main>
    </div>
  );
}
