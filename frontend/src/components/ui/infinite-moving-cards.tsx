"use client";
import customTheme from "../../styles/customTheme";
import ClampLines from 'react-clamp-lines';
import { cn } from "../../utils/cn.ts";
import React, { useEffect, useState } from "react";
import { Box, Stack } from "@mui/material"
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { Link } from "react-router-dom";
import ImageAvatars from "../ImageAvatars/ImageAvatars.tsx";


export const InfiniteMovingCards = ({
   items,
   direction = "left",
   speed = "slow",
   pauseOnHover = true,
   className,
}: {
   items: {
      src?: string;
      quote?: string;
      name?: string;
      title?: string;
   }[];
   direction?: "left" | "right";
   speed?: "fast" | "normal" | "slow";
   pauseOnHover?: boolean;
   className?: string;
}) => {
   const containerRef = React.useRef<HTMLDivElement>(null);
   const scrollerRef = React.useRef<HTMLUListElement>(null);

   useEffect(() => {
      addAnimation();
   });
   const [start, setStart] = useState(false);
   function addAnimation() {
      if (containerRef.current && scrollerRef.current) {
         const scrollerContent = Array.from(scrollerRef.current.children);

         scrollerContent.forEach((item) => {
            const duplicatedItem = item.cloneNode(true);
            if (scrollerRef.current) {
               scrollerRef.current.appendChild(duplicatedItem);
            }
         });

         getDirection();
         getSpeed();
         setStart(true);
      }
   }
   const getDirection = () => {
      if (containerRef.current) {
         if (direction === "left") {
            containerRef.current.style.setProperty(
               "--animation-direction",
               "forwards"
            );
         } else {
            containerRef.current.style.setProperty(
               "--animation-direction",
               "reverse"
            );
         }
      }
   };
   const getSpeed = () => {
      if (containerRef.current) {
         if (speed === "fast") {
            containerRef.current.style.setProperty("--animation-duration", "20s");
         } else if (speed === "normal") {
            containerRef.current.style.setProperty("--animation-duration", "40s");
         } else {
            containerRef.current.style.setProperty("--animation-duration", "500s");
         }
      }
   };
   return (
      <Box
         sx={{
            overflow: 'auto',
            scrollSnapType: 'x mandatory',
            '& > *': {
               scrollSnapAlign: 'center',
            },
            '::-webkit-scrollbar': { display: 'none' },
         }}
         ref={containerRef}
         className={cn(
            `scroller relative z-20 py-2 overflow-hidden  [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]`,
            className
         )}
      >
         <ul
            ref={scrollerRef}
            className={cn(
               " flex gap-4 min-w-full shrink-0 h-full w-max flex-nowrap ",
               start && "animate-scroll ",
               pauseOnHover && "hover:[animation-play-state:paused]"
            )}
         >
            {items.map((item, idx) => (
               <li
                  className="w-[200px]  sm:w-[230px] lg:w-[280px] xl:w-[450px] max-w-full relative rounded-2xl  min-h-full   border-b-0 flex-shrink-0 border-orangePV-300 xl:px-4  "
                  key={idx}
               >
                  {item.quote ? (
                     <div style={{ boxShadow: customTheme.shadows[5] }} className="relative h-full rounded-tr-[10px] rounded-bl-[10px] rounded-br-[10px] p-4  overflow-hidden flex flex-col justify-between items-start">
                        <div className="flex flex-col gap-1 max-w-full">
                           <div className="h-2 w-2 rounded-full flex items-center justify-center  ">
                              <ImageAvatars 
                                 sx={{
                                    width: '20px',
                                    height: '20px',
                                 
                                 }}
                              />
                           </div>

                           <h1 className="font-bold text-xl text-white relative z-50">
                              {item.name}
                           </h1>

                           <ClampLines className="font-normal max-h-[96px] max-w-full text-base text-slate-100 relative z-50 "
                              text={item.quote}
                              id={item.quote}
                              lines={2}
                              ellipsis="..."
                              buttons={false}
                              innerElement="p"
                           />
                        </div>
                        <Stack sx={{
                           width: '100%',


                        }} direction={'row'} justifyContent={'end'} alignItems={'end'}>
                           <Link to="/game">
                              <RemoveRedEyeIcon sx={{
                                 color: customTheme.palette.slate[200],
                                 width: "28px",
                                 height: "28px",

                              }} />
                           </Link>
                        </Stack>

                     </div>
                  ) : (
                     <img onContextMenu={(e) => e.preventDefault()} src={item.src} alt="" className="h-20 w-40 rounded sm:w-52 sm:h-28 lg:w-64 lg:h-36 xl:h-56 xl:w-full cover" />
                  )}

               </li>
            ))}
         </ul>
      </Box>
   );
};
