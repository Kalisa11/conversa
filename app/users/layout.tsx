import Sidebar from "@/app/components/Sidebar/Sidebar";
import getUsers from "@/src/actions/getUsers";
import UserList from "./components/UserList";

export default async function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const users = await getUsers();
  return (
    // @ts-expect-error server component
    <Sidebar>
      <div className="h-full">
        <UserList users={users} />
        {children}
      </div>
    </Sidebar>
  );
}
