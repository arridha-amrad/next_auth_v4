"use client";

import { signIn } from "next-auth/react";

function GoogleLoginBtn() {
  return (
    <button
      onClick={async () => {
        await signIn("google", { callbackUrl: "/", redirect: false });
      }}
      className="bg-amber-600 text-white px-4 py-2 rounded-lg w-full"
    >
      Login with google
    </button>
  );
}

export default GoogleLoginBtn;
