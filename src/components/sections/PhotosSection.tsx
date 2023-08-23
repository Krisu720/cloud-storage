"use client";

import { FC } from "react";
import PhotoPreview from "@/components/dialogs/PhotoPreview";
import { Photos } from "@prisma/client";
import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import { Session } from "next-auth";

interface PhotosSectionProps {
  session: Session;
  photos: Photos[]
}

const PhotosSection: FC<PhotosSectionProps> = ({ session,photos }) => {
 
  const [selected, setSelected] = useState<Photos | null>(null);


  return (
    <>
      <PhotoPreview
        selected={selected}
        setSelected={setSelected}
      />
      <div className="grid lg:grid-cols-8 md:grid-cols-5 sm:grid-cols-4 grid-cols-3  gap-2 mt-6">
        {photos ? (
          photos.map((item, index) => (
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
