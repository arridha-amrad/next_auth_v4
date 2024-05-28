"use client";

import { signOut } from "next-auth/react";

function LogoutButton() {
  return (
    <button
      onClick={async () => {
        await signOut();
      }}
      className="bg-blue-500 text-white self-end w-[6rem] rounded-lg p-2 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 focus:ring-offset-blue-300 transition duration-200 ease-linear"
    >
      Logout
    </button>
  );
}

export default LogoutButton;
