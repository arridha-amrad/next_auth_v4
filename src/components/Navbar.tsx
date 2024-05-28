import Link from "next/link";
import LogoutButton from "./LogoutBtn";
import { getServerSession } from "next-auth";

async function Navbar() {
  const session = await getServerSession();
  if (session) {
    return (
      <nav className="flex items-center px-4 border border-slate-700 h-[70px]">
        <div className="flex items-center w-full">
          <div className="flex-1 space-x-4">
            <Link className="hover:underline" href="/">
              Home
            </Link>
            <Link className="hover:underline flex-1" href="/user-update">
              Update User
            </Link>
          </div>
          <LogoutButton />
        </div>
      </nav>
    );
  }
  return (
    <nav className="flex items-center px-4 border border-slate-700 h-[70px]">
      <div className="flex-1 space-x-4">
        <Link className="hover:underline" href="/login">
          Login
        </Link>
        <Link className="hover:underline" href="/register">
          Register
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
