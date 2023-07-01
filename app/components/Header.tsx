"use client";

import { useMemo, useState } from "react";
import { HiEllipsisHorizontal } from "react-icons/hi2";
import { Conversation, User } from "@prisma/client";
import Link from "next/link";
import useOtherUser from "@/src/hooks/useOtherUser";
import { HiChevronLeft } from "react-icons/hi";
import Avatar from "./Avatar";
import ProfileDrawer from "./ProfileDrawer";

interface HeaderProps {
  conversation: Conversation & {
    users: User[];
  };
}

const Header: React.FC<HeaderProps> = ({ conversation }) => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const otherUser = useOtherUser(conversation);

  const statusText = useMemo(() => {
    if (conversation.isGroup) {
      return `${conversation.users.length} members`;
    }
    return "Active now";
  }, [conversation]);
  return (
    <>
      <ProfileDrawer
        isOpen={openDrawer}
        data={conversation}
        onClose={() => setOpenDrawer(false)}
      />
      <div className="bg-white w-full flex border-b-[1px] sm:px-4 py-3 px-4 lg:px-6 justify-between items-center shadow-sm">
        <div className="flex gap-3 items-center">
          <Link
            href="/conversations"
            className="lg:hidden block text-sky-500 transition hover:text-sky-600 cursor-pointer"
          >
            <HiChevronLeft size={32} />
          </Link>
          <Avatar user={otherUser} />
          <div className="flex flex-col">
            <div>{conversation.name || otherUser.name}</div>
            <div className="text-sm font-light text-neutral-500">
              {statusText}
            </div>
          </div>
        </div>

        <HiEllipsisHorizontal
          size={32}
          onClick={() => setOpenDrawer(true)}
          className="text-sky-500 hover:text-sky-600 cursor-pointer transition"
        />
      </div>
    </>
  );
};

export default Header;
