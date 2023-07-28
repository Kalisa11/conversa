import getCurrentUser from "@/src/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "@/app/lib/prismadb";
import { pusherServer } from "@/app/lib/pusher";

export async function POST(req: Request, res: Response) {
  try {
    const currentUser = await getCurrentUser();
    const body = await req.json();
    const { conversationId, message, image } = body;
    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse("Unauthorized Request", { status: 401 });
    }

    const newMessage = await prisma.message.create({
      data: {
        body: message,
        image: image,
        conversation: {
          connect: {
            id: conversationId,
          },
        },
        sender: {
          connect: {
            id: currentUser.id,
          },
        },
        seen: {
          connect: {
            id: currentUser.id,
          },
        },
      },
      include: {
        sender: true,
        seen: true,
      },
    });

    const updatedConversation = await prisma.conversation.update({
      where: {
        id: conversationId,
      },
      data: {
        lastMessageAt: new Date(),
        messages: {
          connect: {
            id: newMessage.id,
          },
        },
      },
      include: {
        users: true,
        messages: {
          include: {
            seen: true,
          },
        },
      },
    });
    await pusherServer.trigger(conversationId, "messages:new", newMessage);

    const lastMessage =
      updatedConversation.messages[updatedConversation.messages.length - 1];
    updatedConversation.users.map(async (user) => {
      pusherServer.trigger(user.email!, "conversations:update", {
        id: conversationId,
        messages: [lastMessage],
      });
    });

    return NextResponse.json(newMessage);
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
