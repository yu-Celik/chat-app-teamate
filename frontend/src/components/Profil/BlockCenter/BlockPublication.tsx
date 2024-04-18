import customTheme from "../../../styles/customTheme.ts";

import { users } from '../../../data/userData.ts';
import { twMerge } from "tailwind-merge";
import { Stack, alpha, } from "@mui/material";
import ClampLines from "react-clamp-lines";
import ImageAvatars from '../../ImageAvatars/ImageAvatars.tsx';

export function BlockPublication() {
   const dummyContent = [
      {
         id: "1",
         postDate: "Aujourd'hui à 14h30",
         postValue: "Trop beau !!!",
         postImage: "https://images.unsplash.com/photo-1519669556878-63bdad8a1a49?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      {
         id: "2",
         postDate: "Aujourd'hui à 14h30",
         postValue: "Pourquoi non ? Pourquoi vouuuuuus vous dites non ?",
         postImage: "",
      },
      {
         id: "3",
         postDate: "Aujourd'hui à 14h30",
         postValue: "Sit duis est minim proident non nisi velit non consectetur.",
         postImage: "https://images.unsplash.com/photo-1581351123004-757df051db8e?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      {
         id: "4",
         postDate: "Aujourd'hui à 14h30",
         postValue: "Sit duis est minim proident non nisi velit non consectetur..",
         postImage: "https://images.unsplash.com/photo-1555680202-c86f0e12f086?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      {
         id: "5",
         postDate: "jeudi à 14h30",
         postValue: "Sit duis est minim proident non nisi velit non consectetur. Esse adipisicing laboris consectetur enim ipsum rLorem ut aliqua anim do.",
         postImage: "https://images.unsplash.com/photo-1610041321327-b794c052db27?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },

   ];
   
   return (
      <Stack sx={{    
         overflowY: 'scroll',
         '&::-webkit-scrollbar': {
            display: 'none',
         },
         msOverflowStyle: 'none',
         scrollbarWidth: 'none'
      }} className={`px-6 `}>
         <div className="mx-auto lg:mx-0 max-w-2xl antialiased pt-4 relative w-full">
            {dummyContent.map((item, index) => (
               <Stack
                  sx={{
                     backgroundColor: alpha(customTheme.palette.slate[200], 0.1),
                     padding: 2,
                     borderRadius: 1,
                  }}
                  key={`content-${index}`}
                  className="flex flex-col gap-4 mb-10 antialiased r"
               >
                  <Stack>
                     <Stack
                        direction={'row'}
                        alignItems={'center'}
                        justifyContent={'center'}
                        gap={1}
                        component={'h2'}
                        className=" text-slate-200 text-lg w-fit"
                     ><ImageAvatars
                           sx={{
                              width: 20,
                              height: 20,
                           }}
                        />
                        {users[0].username}
                     </Stack>
                     <p className={twMerge("text-slate-400 text-xs")}>
                        {item.postDate}
                     </p>
                  </Stack>
                  <Stack
                     direction={'column'}
                     alignItems={'start'}
                     justifyContent={'center'}
                     gap={0.5}
                  >
                     <ClampLines
                        className=" text-slate-200  dark:prose-invert "
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
                           className="rounded-lg object-cover h-48 w-full"
                        />
                     )}
                  </Stack>
               </Stack>
            ))}
         </div>
      </Stack>
   );
}