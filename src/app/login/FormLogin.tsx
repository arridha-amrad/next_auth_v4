"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";

function FormLogin() {
  const [state, setState] = useState({
    email: "",
    password: "",
  });

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const [error, setError] = useState("");

  const router = useRouter();

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await signIn("credentials", {
        email: state.email,
        password: state.password,
        redirect: false,
      });

      if (response && !response.ok) {
        setError(response.error ?? "");
      } else {
        router.refresh();
        router.replace("/");
      }
    } catch (err) {
      console.log("myError : ", err);
    }
  };

  return (
    <form className="w-full flex flex-col gap-4" onSubmit={onSubmit}>
      <input
        className="border border-slate-600 outline-none p-2 bg-neutral-800 rounded focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 focus:ring-offset-slate-800 transition duration-200 ease-linear"
        type="text"
        name="email"
        placeholder="email"
        value={state.email}
        onChange={onChange}
      />
      <input
        type="text"
        name="password"
        className="border border-slate-600 outline-none p-2 bg-neutral-800 rounded focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 focus:ring-offset-slate-800 transition duration-200 ease-linear"
        placeholder="password"
        value={state.password}
        onChange={onChange}
      />
      <button
        className="bg-blue-500 text-white self-end w-[6rem] rounded p-2 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 focus:ring-offset-blue-50 transition duration-200 ease-linear"
        type="submit"
      >
        Login
      </button>
      <p className="text-red-500">{error}</p>
    </form>
  );
}

export default FormLogin;
