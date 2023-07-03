import ConversationList from "@/app/components/Conversations/ConversationList";
import Sidebar from "@/app/components/Sidebar/Sidebar";
import getConversations from "@/src/actions/getConversations";
import getUsers from "@/src/actions/getUsers";

const ConversationsLayout = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const conversations = await getConversations();
  const users = await getUsers();
  return (
    // @ts-expect-error server component
    <Sidebar>
      <ConversationList users={users} initialItems={conversations} />
      <div className="h-full">{children}</div>
    </Sidebar>
  );
};

export default ConversationsLayout;
