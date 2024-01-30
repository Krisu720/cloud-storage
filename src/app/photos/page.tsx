import Banner from "@/components/sections/Banner";
import PhotosSection from "@/components/sections/PhotosSection";
import authConfig from "@/lib/authConfig";
import { prisma } from "@/utils/prismaSingleton";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
const getUserPhotos = async (userId: string) => {
  "use server";
  const res = await prisma.photos.findMany({ where: { userId } });
  return res;
};

const getUserInfo = async (userId: string) => {
  "use server";
  const res = await prisma.user.findUnique({
    where: { id: userId },
    select: { photos: { orderBy: { createdAt: "asc" } } },
  });

  if (!res) throw Error("Personal info not found.");

  let size: number = 0;
  let counter: number = 0;
  let sharedCounter: number = 0;
  res.photos.map((item) => {
    size = item.size + size;
    item.publicId && sharedCounter++;
    counter++;
  });

  return {
    size: size / 1024 / 1024,
    number: counter,
    sharedNumber: sharedCounter,
  };
};

const sleep = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const Photos = async ({}) => {
  await sleep(300)
  const session = await getServerSession(authConfig);
  const userId = session ? session.user.userId : "";
  const info = await getUserInfo(userId);
  const photos = await getUserPhotos(userId);

  if (session?.user) {
    return (
      <div className="px-2 md:px-0">
        <Banner info={info} />
        <PhotosSection session={session} photos={photos} />
      </div>
    );
  } else {
    redirect("/login");
  }
};

export default Photos;
