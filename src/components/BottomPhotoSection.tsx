"use client";

import { Photos } from "@prisma/client";
import React, { FC } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "~/lib/utils";
import { useSelected } from "~/hooks/selectedStore";

interface BottomPhotoSectionProps {
    photos: Photos[];
}

const smallBlock = 40 as const;
const hoverBlock = 65 as const;

const BottomPhotoSection: FC<BottomPhotoSectionProps> = ({
    photos,
}) => {
const {selected,setSelected} = useSelected()

    const fullWidth =
        photos.reduce((acc) => {
            return acc + smallBlock;
        }, 0);

    const widthBehind = selected && (photos.findIndex((item)=>item.uuid===selected.uuid) + 1) * smallBlock;

    return  (
            <div className="fixed bottom-5 h-16 z-30  w-full flex flex-start">
                {widthBehind &&
                    <motion.div 
                    dragConstraints={{left:-fullWidth, right:0}}
                    drag="x"
                    animate={{
                        x: -widthBehind,
                        transition: { type: "tween" },
                    }} className="absolute left-1/2 -translate-x-10 h-full flex">
                        {photos.map((item) => (
                            <motion.button
                            key={item.uuid}
                            onTap={()=>setSelected(item)}
                                whileHover={{ width: hoverBlock }}
                                animate={{ width: selected?.uuid == item.uuid ? hoverBlock : undefined, marginLeft: selected?.uuid == item.uuid ? 6 : undefined, marginRight: selected?.uuid == item.uuid ? 6 : undefined }}
                                className="h-full w-10 bg-black relative">
                                <Image
                                draggable="false"
                                    className="object-cover"
                                    src={item.url}
                                    alt={item.uuid}
                                    quality={50}
                                    sizes="(max-width: 768px) 15vw, (max-width: 1200px) 10vw, 8vw"
                                    fill
                                />
                            </motion.button>
                        ))}
                    </motion.div>}
            </div>
        
    );
};

export default BottomPhotoSection;
