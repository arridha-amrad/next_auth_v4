"use client";

import { signIn } from "next-auth/react";

function GithubLoginButton() {
  return (
    <button
      onClick={async () => {
        await signIn("github", { callbackUrl: "/", redirect: false });
      }}
      className="bg-slate-200 text-black px-4 py-2 rounded-lg w-full"
    >
      Login with github
    </button>
  );
}

export default GithubLoginButton;
