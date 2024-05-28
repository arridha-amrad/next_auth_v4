import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import Image from "next/image";
import DefaultAvatar from "@/default.jpg";

async function Page() {
  const session = await getServerSession();

  if (!session) {
    redirect("/login");
  }

  return (
    <main className="w-full h-full">
      {/* <Client /> */}
      <div className="flex py-4 flex-col items-center gap-4 justify-center">
        <Image
          priority
          width={200}
          height={200}
          alt="avatar"
          className="w-[250px] rounded-full aspect-square object-cover"
          src={session.user?.image ?? DefaultAvatar}
        />
        <div>
          <p>name : {session.user?.email}</p>
          <p>name : {session.user?.name}</p>
        </div>
      </div>
    </main>
  );
}

export default Page;
