import { useMemo } from "react";
import { signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import { HiArrowLeftOnRectangle, HiUsers } from "react-icons/hi2";
import { HiChat } from "react-icons/hi";
import useConversation from "./useConversation";

const useRoutes = () => {
  const pathname = usePathname();
  const { conversationId } = useConversation();

  const routes = useMemo(
    () => [
      {
        label: "Chat",
        icon: HiChat,
        href: "/conversations",
        active: pathname === "/conversations" || !!conversationId,
        notification: true,
      },
      {
        label: "Users",
        icon: HiUsers,
        href: "/users",
        active: pathname === "/users",
      },
      {
        label: "Logout",
        icon: HiArrowLeftOnRectangle,
        href: "#",
        onClick: () => signOut(),
      },
    ],
    [pathname, conversationId]
    );
    return routes;
};

export default useRoutes;