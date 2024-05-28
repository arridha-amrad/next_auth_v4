"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import LogoutButton from "./LogoutBtn";

function Navbar() {
  const { status } = useSession();
  return (
    <nav className="flex items-center px-4 border border-slate-700 py-4">
      {status === "authenticated" ? (
        <>
          <div className="flex-1 space-x-4">
            <Link className="hover:underline" href="/">
              Home
            </Link>
            <Link className="hover:underline" href="/user-update">
              Update User
            </Link>
          </div>
          <LogoutButton />
        </>
      ) : (
        <div className="flex-1 space-x-4">
          <Link className="hover:underline" href="/login">
            Login
          </Link>
          <Link className="hover:underline" href="/register">
            Register
          </Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
