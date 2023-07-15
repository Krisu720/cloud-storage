import Banner from "@/components/sections/Banner";
import PhotosSection from "@/components/sections/PhotosSection";
import authConfig from "@/lib/authConfig";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const Photos = async ({}) => {
  const session = await getServerSession(authConfig);
  if (session?.user) {
    return (
      <div className="">
        <Banner session={session} />
        <PhotosSection session={session} />
      </div>
    );
  } else {
    redirect("/login");
  }
};

export default Photos;
