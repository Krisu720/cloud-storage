import LoginForm from "@/components/forms/LoginForm";
import Heading from "@/components/ui/Heading";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const page = async () => {
  const session = await getServerSession();

  if (session) {
    redirect("/photos");
  } else {
    return (
      <div className="flex justify-center items-center">
        <div className="flex flex-col mt-28">
          <Heading size="xl" weight="bold">
            Log in
          </Heading>
          <LoginForm />
        </div>
      </div>
    );
  }
};
export default page;
