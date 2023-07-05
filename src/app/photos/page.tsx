import { prisma } from "@/utils/prismaSingleton";
import Image from "next/image";
import { FC } from "react";

const getPhotos = async () => {
  const res = await prisma.photos.findMany();
  return res;
};

const Photos = async ({}) => {
  const photos = await getPhotos();

  return (
    <div className="container mx-auto">
      <div className="grid lg:grid-cols-8 md:grid-cols-5 sm:grid-cols-4 grid-cols-3 px-4 gap-2 mt-2">
        {photos.map((item) => (
          <div className="w-full h-full flex items-center justify-center shadow rounded bg-sky-500">
            <Image className="" key={item.uuid} src={item.url} alt={item.url} height={400} width={500} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Photos;
