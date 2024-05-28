"use client";

import { ChangeEvent, useRef, useState } from "react";
import { className } from "../login/FormLogin";
import { useFormState } from "react-dom";
import { registerAction } from "@/action";
import SubmitButton from "./SubmitBtn";

const intitialState = {
  message: "",
  type: "",
};

function FormRegister() {
  const [state, setState] = useState({
    email: "",
    name: "",
    password: "",
    image: "",
  });
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const [formState, formAction] = useFormState(registerAction, intitialState);
  const formRef = useRef<HTMLFormElement | null>(null);
  return (
    <form
      ref={formRef}
      className="w-full flex flex-col gap-4"
      action={(data) => {
        formAction(data);
        formRef.current?.reset();
      }}
    >
      <input
        className={className.input}
        type="text"
        name="email"
        placeholder="email"
        value={state.email}
        onChange={onChange}
      />
      <input
        className={className.input}
        type="text"
        name="name"
        placeholder="name"
        value={state.name}
        onChange={onChange}
      />
      <input
        type="text"
        name="image"
        className={className.input}
        placeholder="image url"
        value={state.image}
        onChange={onChange}
      />
      <input
        type="text"
        name="password"
        className={className.input}
        placeholder="password"
        value={state.password}
        onChange={onChange}
      />
      <SubmitButton />
      <p
        className={
          formState.type === "error" ? "text-red-500" : "text-green-500"
        }
      >
        {formState.message}
      </p>
    </form>
  );
}

export default FormRegister;
