"use client";

import PhotoPreview from "@/components/sections/PhotoPreview";
import { Photos } from "@prisma/client";
import axios from "axios";
import Image from "next/image";
import { FC, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Banner from "@/components/sections/Banner";

const Photos = ({}) => {
  const [photos, setPhotos] = useState<Photos[] | null>(null);

  const [selected, setSelected] = useState<Photos | null>(null);

  useEffect(() => {
    const getPhotos = async () => {
      const { data }: { data: Photos[] } = await axios.get("/api/photos");
      if (data) {
        setPhotos(data);
      }
    };
    getPhotos();
  }, []);

  return (
    <div className="">
      <Banner />
      <PhotoPreview selected={selected} setSelected={setSelected} />

      <div className="grid lg:grid-cols-8 md:grid-cols-5 sm:grid-cols-4 grid-cols-3  gap-2 mt-6">
        {photos !== null ? (
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
              // layoutId={item.uuid}
              onClick={() => setSelected(item)}
              className="w-full h-40 flex items-center justify-center shadow rounded relative"
            >
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
    </div>
  );
};

export default Photos;
