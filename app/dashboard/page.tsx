import { UserInfo } from "@/types/type";
import { getMemberInfo, saveUserInfo } from "@/lib/api";
import { generateQrData } from "@/lib/qr";
import { ProfileForm } from "@/components/userform";
import { currentUser } from "@clerk/nextjs/server";


export default async function DashboardPage() {
  const user = await currentUser();

  if (!user?.id) {
    return <p>Error: User ID is not available.</p>;
  }

  const userId = user.id;
  let memberInfo: UserInfo | null = null;

  try {
    const res = await getMemberInfo(userId);
    if (res) {
      memberInfo = { ...res, clerkUserId: userId };
    } else {
      const qrContent = generateQrData({ userID: userId });
      memberInfo = {
        name: user.firstName || "",
        email: user.emailAddresses[0]?.emailAddress || "",
        phone: "",
        clerkUserId: userId,
        qrCode: qrContent,
      };
      await saveUserInfo(userId, memberInfo);
    }
  } catch (error) {
    console.error("Error initializing member data:", error);
  }

  if (!memberInfo) {
    return <p>Loading...</p>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-8">Welcome, {memberInfo.name}</h1>
      <ProfileForm memberInfo={memberInfo} />
    </div>
  );
}
