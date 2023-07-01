import Body from "@/app/components/Body";
import EmptyState from "@/app/components/EmptyState";
import Form from "@/app/components/Form";
import Header from "@/app/components/Header";
import getConversationsById from "@/src/actions/getConversationsById";
import getMessages from "@/src/actions/getMessages";

interface IParams {
  conversationId: string;
}

const ConversationId = async ({ params }: { params: IParams }) => {
  console.log({ params });

  const conversation = await getConversationsById(params.conversationId);
  const messages = await getMessages(params.conversationId);

  if (!conversation) {
    return (
      <div className="lg:pl-80 h-full">
        <div className="h-full flex flex-col">
          <EmptyState />
        </div>
      </div>
    );
  }
  return (
    <div className="lg:pl-80 h-full">
      <div className="h-full flex flex-col ">
        <Header conversation={conversation} />
        <Body initialMessage={messages} />
        <Form />
      </div>
    </div>
  );
};

export default ConversationId;
