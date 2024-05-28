import GoogleLoginBtn from "@/components/GoogleBtn";
import FormLogin from "./FormLogin";
import GithubLoginButton from "@/components/GithubBtn";

function Page() {
  return (
    <main className="w-full py-4 space-y-3 max-w-md mx-auto px-4">
      <FormLogin />
      <GoogleLoginBtn />
      <GithubLoginButton />
    </main>
  );
}

export default Page;
