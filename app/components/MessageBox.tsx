"use client";

import { FullMessageType } from "@/src/types";
import clsx from "clsx";
import { useSession } from "next-auth/react";
import Avatar from "./Avatars/Avatar";
import { format } from "date-fns";
import Image from "next/image";

interface MessageBoxProps {
  isLast?: boolean;
  data: FullMessageType;
}

const MessageBox = ({ data, isLast }: MessageBoxProps) => {
  const session = useSession();
  const isMe = session?.data?.user?.email === data?.sender?.email;
  const isImage = data?.image;
  const seenList = (data?.seen || [])
    .filter((user) => user?.email !== data?.sender?.email)
    .map((user) => user?.name)
    .join(", ");

  const container = clsx("flex gap-3 p-4", isMe && "justify-end");
  const avatar = clsx(isMe && "order-2");
  const body = clsx("flex flex-col gap-2", isMe && "items-end");
  const message = clsx(
    "text-sm w-fit overflow-hidden",
    isMe ? "text-white bg-sky-500" : "bg-gray-100",
    isImage ? "rounded-md p-0" : "rounded-full py-2 px-3"
  );
  return (
    <div className={container}>
      <div className={avatar}>
        <Avatar user={data.sender} />
      </div>
      <div className={body}>
        <div className="flex items-center gap-1">
          <div className="text-sm text-gray-500">{data.sender.name}</div>
          <div className="text-xs text-gray-400">
            {format(new Date(data.createdAt), "p")}
          </div>
        </div>
        <div className={message}>
          {isImage ? (
            <Image
              className="object-cover cursor-pointer hover:scale-110 transition translate"
              src={data?.image as string}
              width={288}
              height={288}
              alt="image-msg"
            />
          ) : (
            <div>{data.body}</div>
          )}
        </div>
        {isLast && isMe && seenList.length > 0 && (
          <div className="text-xs font-light text-gray-500">{`Seen by ${seenList}`}</div>
        )}
      </div>
    </div>
  );
};

export default MessageBox;
