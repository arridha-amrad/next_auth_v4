import UpdateUserForm from "@/components/UpdateUserForm";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";

async function Page() {
  const session = await getServerSession();
  if (!session) {
    redirect("/login");
  }
  return <UpdateUserForm />;
}

export default Page;
