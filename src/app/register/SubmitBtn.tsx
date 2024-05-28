import { useFormStatus } from "react-dom";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      disabled={pending}
      className="bg-blue-500 text-white self-end w-[6rem] rounded p-2 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 focus:ring-offset-blue-50 transition duration-200 ease-linear"
      type="submit"
    >
      {pending ? "loading..." : "Register"}
    </button>
  );
}

export default SubmitButton;
