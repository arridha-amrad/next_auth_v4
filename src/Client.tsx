"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { className } from "./app/login/FormLogin";
import Image from "next/image";
import DefaultAvatar from "@/default.jpg";

function Client() {
  const session = useSession();
  const logout = async () => {
    await signOut({ callbackUrl: "/login" });
  };
  return (
    <section className="w-full bg-green-500">
      {session.status === "loading" && <h1>LOADING...</h1>}
      {session.status === "unauthenticated" ? (
        <div className="w-full bg-red-800">
          <h1>UNAUTHENTICATED</h1>
          <div className="flex gap-4 w-full space-x-3">
            <Link className="block hover:underline" href="/login">
              login
            </Link>
            <Link className="block hover:underline" href="/register">
              register
            </Link>
          </div>
        </div>
      ) : (
        <>
          <div className="w-12 h-12 overflow-hidden rounded-full bg-red-500">
            <Image
              priority
              width={100}
              height={100}
              className="object-cover w-10 aspect-square rounded-full"
              alt="avatar"
              src={session.data?.user?.image ?? DefaultAvatar}
            />
            <p>{session.data?.user?.name}</p>
            <p>{session.data?.user?.email}</p>
          </div>
          <button onClick={logout} className={className.button}>
            Logout
          </button>
        </>
      )}
    </section>
  );
}

export default Client;
