import React, { useEffect, useState } from "react";

const useRects = ({ ref }: { ref: React.RefObject<HTMLDivElement> }):[DOMRect | null,()=>void] => {
    const [rects, setRects] = useState<DOMRect | null>(ref.current?.getBoundingClientRect() ? ref.current.getBoundingClientRect() : null);

    const loadRects = () => {
        if (ref.current?.getBoundingClientRect().width)
            setRects(ref.current.getBoundingClientRect());
    }

    useEffect(() => {
        loadRects()
        window.addEventListener("resize", loadRects);

        return () => {
            window.removeEventListener("resize", loadRects);
        };
    }, [ref.current]);
    return [rects,loadRects];
};

export default useRects;
