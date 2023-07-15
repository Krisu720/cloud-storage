import RegisterForm from "@/components/forms/RegisterForm";
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
            Register
          </Heading>
          <RegisterForm />
        </div>
      </div>
    );
  }
};
export default page;
