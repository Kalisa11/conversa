import prisma from "@/app/lib/prismadb";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

const getCurrentUser = async () => {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return null;
    }
    const currentUser = await prisma.user.findUnique({
      where: { email: session?.user?.email as string },
    });

    if (!currentUser) {
      return null;
    }
    return currentUser;
  } catch (error: any) {
    return null;
  }
};

export default getCurrentUser;
