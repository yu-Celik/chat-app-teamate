import React from "react";

import { AnimatePresence, motion } from "framer-motion";
import { GiTrophyCup } from "react-icons/gi";
import gta from '../../../../assets/imgGames/gta.jpg';
import rocketLeague from '../../../../assets/imgGames/rocket.jpg';
import valorant from '../../../../assets/imgGames/Valorant.jpeg';
export function TopGame() {
  return (
    <>
      <div className="p-2 flex flex-col  items-center justify-center bg-bluePV-1000 gap-4  rounded  ">
        <Card title="Valorant" icon={<GiTrophyCup className="h-10 w-10 text-yellow-400  lg:group-hover/canvas-card:text-yellow-400" />
        }>
          <img src={valorant} alt="valorant"
            style={{
              objectFit: 'cover',
              width: '100%',
              height: '100%'
            }} />
        </Card>
        <Card title="Rocket League" icon={<GiTrophyCup className="h-10 w-10 text-zinc-500  lg:group-hover/canvas-card:text-zinc-500" />
        }>
          <img src={rocketLeague} alt="gtaV"
            style={{
              objectFit: 'cover',
              width: '100%',
              height: '100%'
            }}
          />


        </Card>
        <Card title="gta V" icon={<GiTrophyCup className="h-10 w-10 text-orange-950  lg:group-hover/canvas-card:text-orange-950" />
        }>
          <img src={gta} alt="gtaV"
            style={{
              objectFit: 'cover',
              width: '100%',
              height: '100%'
            }}
          />

        </Card>
      </div>
    </>
  );
}

const Card = ({
  title,
  icon,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  children?: React.ReactNode;
}) => {
  const [hovered, setHovered] = React.useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="border border-black/[0.2] group/canvas-card flex items-center justify-center dark:border-white/[0.2]   w-full   p-4  relative"
    >
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="h-full w-full absolute inset-0"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
      <div className="relative z-20">
        <div className="text-center lg:group-hover/canvas-card:-translate-y-4 lg:group-hover/canvas-card:opacity-0 transition duration-500 w-full  mx-auto flex items-center justify-center">
          {icon}
        </div>
        <h2 className= "lg:hidden lg:group-hover/canvas-card:block dark:text-white text-xl lg:opacity-0 lg:group-hover/canvas-card:opacity-100 relative z-10 text-black mt-4  font-bold lg:group-hover/canvas-card:text-white lg:group-hover/canvas-card:-translate-y-2 transition duration-500">
          {title}
        </h2>
      </div>
    </div>
  );
};


