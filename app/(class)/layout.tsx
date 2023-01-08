export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
    <h2>Article Layout</h2>
    {children}
    </>
  )
}
