import prisma from "@/app/lib/prismadb";
import getCurrentUser from "./getCurrentUser";

const getConversationsById = async (conversationId: string) => {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser?.id) {
      return null;
    }

    const conversation = await prisma.conversation.findUnique({
      where: {
        id: conversationId,
      },
      include: {
        users: true,
      },
    });

    return conversation;
  } catch (error) {
    console.error("Error retrieving conversations:", error);
    return null;
  }
};
export default getConversationsById;
