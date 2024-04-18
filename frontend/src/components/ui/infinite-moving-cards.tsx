import { cn } from "../../utils/cn";
import React, { useEffect, useState } from "react";
import ImageAvatars from "../ImageAvatars/ImageAvatars";
import ClampLines from 'react-clamp-lines';

export const InfiniteMovingCards = ({
   items,
   direction,
   speed,
   pauseOnHover,
   className,
}: {
   items: {
      id: number;
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
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   const [start, setStart] = useState(false);
   function addAnimation() {
      requestAnimationFrame(() => {
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
      });
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
            containerRef.current.style.setProperty("--animation-duration", "700s");
         }
      }
   };
   const isImage = items.some(item => item.src);

   return (
      <div
         ref={containerRef}
         className={cn(
            "scroller relative z-20 max-w-7xl overflow-hidden",
            className
         )}
         style={{
            scrollSnapType: 'x mandatory',
            WebkitMaskImage: 'linear-gradient(to right, transparent, white 20%, white 80%, transparent)',
            maskImage: 'linear-gradient(to right, transparent, white 20%, white 80%, transparent)',
            WebkitOverflowScrolling: 'touch',
            overflowX: 'scroll',
            scrollbarWidth: 'none',
         }}
      >
         <ul
            ref={scrollerRef}
            className={cn(
               " flex min-w-full shrink-0 gap-4 py-4 w-max flex-nowrap",
               start && "animate-scroll ",
               pauseOnHover && "hover:[animation-play-state:paused]"
            )}
         >
            {isImage ? (
               items.map((item) => (
                  <img key={item.id} onContextMenu={(e) => e.preventDefault()} src={item.src} alt="" className="rounded h-20 sm:h-28 md:h-32 lg:h-32" />
               ))

            ) : (
               items.map((item) => (
                  <li
                     key={item.id}
                     className="w-[350px] max-w-full relative rounded-2xl border border-none flex-shrink-0 px-8 py-6 md:w-[450px]"
                  >
                     <blockquote>
                        <div aria-hidden="true" className="user-select-none -z-1 pointer-events-none absolute -left-0.5 -top-0.5 h-[calc(100%_+_4px)] w-[calc(100%_+_4px)]"></div>
                        <ClampLines
                           className="font-normal text-base text-slate-50 h-12 "
                           id={item.id.toString()}
                           text={item.quote || ''}
                           lines={2}
                           ellipsis="..."
                           buttons={false}
                           innerElement="p"
                        />
                        <div className="relative z-20 mt-6 flex flex-row items-center">
                           <ImageAvatars
                              sx={{
                                 width: '20px',
                                 height: '20px',
                                 marginRight: '8px'
                              }}
                           />
                           <span className=" text-sm leading-[1.6] text-gray-400 font-normal">
                              {item.name}
                           </span>
                        </div>
                     </blockquote>
                     <div className="absolute inset-0 bg-gradient-to-b from-slate-800 via-slate-900 to-slate-800 opacity-30"></div>
                  </li>
               ))
            )}
         </ul>
      </div>
   );
};
