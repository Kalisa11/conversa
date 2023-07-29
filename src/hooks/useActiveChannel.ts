import { useEffect, useState } from "react";
import { useActiveList } from "./useActiveList";
import { Channel, Members } from "pusher-js";
import { pusherClient } from "@/app/lib/pusher";

const useActiveChannel = () => {
  const { setMembers, addMember, removeMember } = useActiveList();
  const [activeChannel, setActiveChannel] = useState<Channel | null>(null);

  useEffect(() => {
    let channel = activeChannel;

    if (!channel) {
      channel = pusherClient.subscribe("presence-messenger");
      setActiveChannel(channel);
    }

    // subscribe to events
    channel.bind("pusher:subscription_succeeded", (members: Members) => {
      const initialMembers: string[] = [];

      members.each((member: Record<string, any>) => {
        initialMembers.push(member.id);
      });
      setMembers(initialMembers);
    });

    // new member joined channel
    channel.bind("pusher:member_added", (member: Record<string, any>) => {
      addMember(member.id);
    });

    // member left channel
    channel.bind("pusher:member_removed", (member: Record<string, any>) => {
      removeMember(member.id);
    });

    return () => {
      if (activeChannel) {
        channel?.unbind_all();
        pusherClient.unsubscribe("presence-messenger");
        setActiveChannel(null);
      }
    };
  }, [activeChannel, addMember, removeMember, setMembers]);
};

export default useActiveChannel;
