"use client";

import { FC } from "react";
import PhotoPreview from "@/components/dialogs/PhotoPreview";
import { Photos } from "@prisma/client";
import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import { getPhotos, PHOTOS_ENDPOINT } from "@/lib/apiCalls";
import { Session } from "next-auth";
import useSWR from "swr";
interface PhotosSectionProps {
  session: Session;
}

const PhotosSection: FC<PhotosSectionProps> = ({ session }) => {
  const { data, isLoading, mutate } = useSWR<{ photos: Photos[] }>(
    PHOTOS_ENDPOINT+session.user.userId,
    () => getPhotos(session.user.userId)
  );
  const [selected, setSelected] = useState<Photos | null>(null);
  return (
    <>
      <PhotoPreview
        selected={selected}
        setSelected={setSelected}
        mutate={mutate}
      />
      <div className="grid lg:grid-cols-8 md:grid-cols-5 sm:grid-cols-4 grid-cols-3  gap-2 mt-6">
        {data ? (
          data.photos.map((item, index) => (
            <motion.button
              key={item.uuid}
              initial={{ y: 25, opacity: 0 }}
              animate={{
                y: 0,
                opacity: 1,
                transition: { delay: index * 0.05 },
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelected(item)}
              className="w-full h-40 flex items-center justify-center shadow rounded relative"
            >
              {item.publicId && (
                <div className="absolute top-2 right-2 h-5 w-5 bg-green-500 rounded-full z-10 animate-pulse" />
              )}
              <Image
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                src={item.url}
                alt={item.url}
                fill
                className="object-cover"
              />
            </motion.button>
          ))
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default PhotosSection;
