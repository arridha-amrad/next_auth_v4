"use client";

import { useEffect, useRef, useState } from "react";
import SubmitButton from "./SubmitBtn";
import { updateUserAction } from "@/action";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function UpdateUserForm() {
  const { data, update, status } = useSession();
  const [name, setName] = useState("");
  const router = useRouter();
  const formRef = useRef<HTMLFormElement | null>(null);

  useEffect(() => {
    if (status === "authenticated") {
      setName(data.user.name ?? "");
    }
  }, [status]);

  return (
    <fieldset disabled={status === "loading"}>
      <form
        ref={formRef}
        className="flex p-2 items-center gap-4 w-full h-fit"
        action={async (data) => {
          const response = await updateUserAction(data);

          if (response) {
            await update(response);
          }
          router.refresh();
        }}
      >
        <input
          readOnly
          name="email"
          type="text"
          hidden
          value={data?.user?.email ?? ""}
        />
        <input
          type="text"
          placeholder="New name"
          value={name}
          name="name"
          className="border border-slate-600 outline-none p-2 bg-neutral-800 rounded focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 focus:ring-offset-slate-800 transition duration-200 ease-linear w-full"
          onChange={(e) => setName(e.target.value)}
        />
        <SubmitButton />
      </form>
    </fieldset>
  );
}
