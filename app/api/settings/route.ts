import getCurrentUser from "@/src/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "@/app/lib/prismadb";

export async function POST(req: Request) {
  try {
    const currentUser = await getCurrentUser();
    const body = await req.json();
    const { name, image } = body;

    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse("Unauthorized request", { status: 401 });
    }

    const updatedUser = await prisma.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        image: image,
        name: name,
      },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error(error, "updating user fields error");
    return new NextResponse("Internal server error", { status: 500 });
  }
}
