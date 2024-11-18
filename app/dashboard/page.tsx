import { ProfileForm } from "@/components/userform";
import  prisma  from "@/lib/db";

import { currentUser } from "@clerk/nextjs/server";

export default async function DashboardPage() {
     const user = await  currentUser()

     if(!user){
    return (
      <div>
        <h1>Please log in to view your dashboard.</h1>
      </div>
    );
  }

  // Fetch the member info from the database
  const memberInfo = await prisma.user.findUnique({
    where: { clerkUserId: user.id },
  });

  if (!memberInfo) {
    return (
      <div>
        <h1>User data not found.</h1>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex items-center flex-col justify-center">
      <h1 className="text-3xl font-bold mb-8">Welcome, {memberInfo.name}</h1>
      <ProfileForm memberInfo={memberInfo} />
    </div>
  );
}
