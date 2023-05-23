import Sidebar from "@/app/components/Sidebar/Sidebar";

export default async function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // @ts-expect-error server component
    <Sidebar>
      <div className="h-full">{children}</div>
    </Sidebar>
  );
}
