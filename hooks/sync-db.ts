import prisma from "@/lib/db";

export async function createUser(user: { clerkId: string; email: string; username?: string | null; image_url?: string | null }) {
  return await prisma.user.create({
    data: {
      clerkUserId: user.clerkId,
      email: user.email,
      name: user.username ?? "",
      profilePic: user.image_url,
    },
  });
}

export async function updateUser(clerkId: string, updates: { username?: string | null; image_url?: string | null }) {
  return await prisma.user.update({
    where: { clerkUserId: clerkId },
    data: {
      name: updates.username ?? undefined,
      profilePic: updates.image_url ?? undefined,
    },
  });
}

export async function deleteUser(clerkId: string) {
  return await prisma.user.delete({
    where: { clerkUserId: clerkId },
  });
}
