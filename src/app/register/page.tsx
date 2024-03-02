import Link from "next/link";
import { redirect } from "next/navigation";
import AuthButtons from "~/components/auth/0auth-buttons";
import RegisterForm from "~/components/auth/register-form";
import { Separator } from "~/components/ui/separator";
import { validateSession } from "~/server/auth";
const page = async () => {
  const { session } = await validateSession();

  if (session) {
    redirect("/photos");
  } else {
    return (
      <div className="flex justify-center items-center">
        <div className="flex flex-col mt-28 w-full max-w-sm">
          <h1 className="text-center font-semibold text-xl">Register</h1>

          <RegisterForm />
          <div className="flex w-full gap-4 items-center my-4">
            <Separator className="flex-1" orientation="horizontal" />
            <h1 className="text-gray-500 text-xs">OR</h1>
            <Separator className="flex-1" orientation="horizontal" />
          </div>
          <AuthButtons />
          <h1 className="mt-6 h1">
            Have an account?{" "}
            <Link href="/login" className="text-primary hover:underline">
              Log in!
            </Link>
          </h1>
        </div>
      </div>
    );
  }
};
export default page;
