import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { className } from "./app/login/FormLogin";
import Image from "next/image";
import DefaultAvatar from "@/default.jpg";
import { getServerSession } from "next-auth/next";

async function ServerView() {
  const session = await getServerSession();
  return (
    <div className="w-full bg-red-600 h-full border flex items-center justify-center flex-col">
      <div className="bg-green-500">
        {/* <Image
          priority
          width={100}
          height={100}
          className="object-cover w-20 aspect-square rounded-full"
          alt="avatar"
          src={session?.user?.image ?? DefaultAvatar}
        /> */}
        <p>{session?.user?.name}</p>
        <p>{session?.user?.email}</p>
      </div>
    </div>
  );
}

export default ServerView;
