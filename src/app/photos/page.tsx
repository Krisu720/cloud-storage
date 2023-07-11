"use client";

import PhotoPreview from "@/components/sections/PhotoPreview";
import { Photos } from "@prisma/client";
import Image from "next/image";
import { useState } from "react";
import {motion } from "framer-motion";
import Banner from "@/components/sections/Banner";
import { getPhotos,photosEndpoint as cacheKey } from "@/utils/apiCalls";
import useFetch from "@/hooks/useFetch";

const Photos = ({}) => {
  const {data,isLoading,mutate} = useFetch<{photos:Photos[]}>(cacheKey,getPhotos)
  const [selected, setSelected] = useState<Photos | null>(null);
 
  return (
    <div className="">
      <Banner />
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
