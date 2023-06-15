import prisma from "@/app/lib/prismadb";

import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

const getUsers = async () => {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return [];
    }
    const users = await prisma.user.findMany({
      orderBy: {
        createdAt: "desc",
      },
      where: {
        NOT: { email: session?.user?.email as string },
      },
    });
    return users;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export default getUsers;
