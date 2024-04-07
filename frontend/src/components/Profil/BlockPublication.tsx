"use client";

import { users } from './../../data/userData.ts';
import { twMerge } from "tailwind-merge";
import { Stack } from "@mui/material";
import ClampLines from "react-clamp-lines";



export function BlockPublication() {
   const valeurBlockPublication = 300.5;
   return (
      <Stack sx={{
         maxHeight: `calc(100dvh - ${valeurBlockPublication}px)`,
      }} className={`px-6 overflow-scroll  `}>
         <div className="max-w-2xl mx-auto antialiased pt-4 relative">
            {dummyContent.map((item, index) => (
               <Stack key={`content-${index}`} className="flex flex-col gap-4 mb-10 antialiased r">
                  <Stack>
                     <Stack
                        component={'h2'}
                        className=" text-slate-200 text-base w-fit"
                     >
                        {users[0].username}
                     </Stack>
                     <p className={twMerge("text-slate-200 text-xs")}>
                        {item.postDate}
                     </p>
                  </Stack>
                  <Stack>
                     <ClampLines
                        className="text-sm text-slate-200 prose prose-sm dark:prose-invert "
                        text={item.postValue}
                        id={item.id}
                        lines={2}
                        ellipsis="..."
                        buttons={false}
                        innerElement="p"
                     />
                     {item?.postImage && (
                        <img
                           src={item.postImage}
                           alt="blog thumbnail"
                           height="1000"
                           width="1000"
                           className="rounded-lg object-cover h-32 w-full"
                        />
                     )}

                  </Stack>
               </Stack>
            ))}
         </div>
      </Stack>
   );
}

const dummyContent = [
   {
      id: "1",
      postDate: "Aujourd'hui à 14h30",
      postValue: "Trop beau !!!",
      postImage:
         "https://images.unsplash.com/photo-1519669556878-63bdad8a1a49?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
   },
   {
      id: "2",
      postDate: "Aujourd'hui à 14h30",
      postValue: "Sit duis est minim proident non nisi velit non consectetur.",
      postImage: "https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
   },
   {
      id: "3",
      postDate: "Aujourd'hui à 14h30",
      postValue: "Sit duis est minim proident non nisi velit non consectetur.",
      postImage:
         "https://images.unsplash.com/photo-1581351123004-757df051db8e?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
   },
   {
      id: "4",
      postDate: "Aujourd'hui à 14h30",
      postValue: "Sit duis est minim proident non nisi velit non consectetur..",
      postImage:
         "https://images.unsplash.com/photo-1555680202-c86f0e12f086?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
   },
   {
      id: "5",
      postDate: "jeudi à 14h30",
      postValue: "Sit duis est minim proident non nisi velit non consectetur. Esse adipisicing laboris consectetur enim ipsum rLorem ut aliqua anim do.",
      postImage: "https://images.unsplash.com/photo-1610041321327-b794c052db27?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
   },

];
