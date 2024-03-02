import Link from "next/link";
import { redirect } from "next/navigation";
import AuthButtons from "~/components/auth/0auth-buttons";
import LoginForm from "~/components/auth/login-form";
import { Separator } from "~/components/ui/separator";
import { validateSession } from "~/server/auth";

const page = async () => {
  const { session } = await validateSession();

  if (session) {
    redirect("/photos");
  } else {
    return (
      <div className="flex justify-center items-center">
        <div className="flex flex-col mt-28 max-w-sm w-full">
          <h1 className="text-center font-semibold text-xl">Login</h1>
          <LoginForm />
          <div className="flex w-full gap-4 items-center my-4">
            <Separator className="flex-1" orientation="horizontal" />
            <h1 className="text-gray-500 text-xs">OR</h1>
            <Separator className="flex-1" orientation="horizontal" />
          </div>
          <AuthButtons />
          <h1 className="mt-6 h1">
            Dont have an account?{" "}
            <Link href="/register" className="text-primary hover:underline">
              Register!
            </Link>
          </h1>
        </div>
      </div>
    );
  }
};
export default page;
