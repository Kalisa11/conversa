import ConversationList from "@/app/components/Conversations/ConversationList";
import Sidebar from "@/app/components/Sidebar/Sidebar";
import getConversations from "@/src/actions/getConversations";

const ConversationsLayout = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const conversations = await getConversations();
  return (
    // @ts-expect-error server component
    <Sidebar>
      <ConversationList initialItems={conversations} />
      <div className="h-full">{children}</div>
    </Sidebar>
  );
};

export default ConversationsLayout;
