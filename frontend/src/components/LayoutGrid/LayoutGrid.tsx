"use client";
import React, { useState, } from "react";
import { motion } from "framer-motion";
import { cn } from "../../utils/cn.ts";
import img1 from './../../assets/imgGames/assassin.jpg';
import img3 from './../../assets/imgGames/nba.jpeg';
import img4 from './../../assets/imgGames/Minecraft.jpg';
import img2 from './../../assets/imgGames/apex.jpg';
import img5 from './../../assets/imgGames/league.jpg';
import img6 from './../../assets/imgGames/fornite.jpg';
import img7 from './../../assets/imgGames/CS.jpg';
import img8 from './../../assets/imgGames/Valorant.jpeg';

const heightHeader = '68.5px';

type Card = {
  id: number;
  content: JSX.Element | React.ReactNode | string;
  className: string;
  thumbnail: string;
};

const cards: Card[] = [
  {
      id: 1,
      content: <div>
          <p className="font-bold text-4xl text-white">Assassin's Creed</p>
          <p className="font-normal text-base text-white"></p>
          <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
              Assassin's Creed est une série de jeux vidéo d'action-aventure qui se déroule à travers différentes époques historiques, mettant en scène un conflit ancestral entre les Assassins et les Templiers, avec un gameplay mêlant exploration, infiltration et combat.
          </p>
      </div>,
      className: 'col-span-2',
      thumbnail: img1,
  },
  {
      id: 2,
      content: <div>
          <p className="font-bold text-4xl text-white">Apex</p>
          <p className="font-normal text-base text-white"></p>
          <p className="font-normal text-base my-4 max-w-lg text-neutral-200">

              Apex Legends est un jeu vidéo de type battle royale développé par Respawn Entertainment, où des équipes de joueurs s'affrontent dans une arène futuriste en utilisant des personnages aux compétences uniques pour être la dernière équipe en vie.
          </p>
      </div>,
      className: 'col-span-1',
      thumbnail: img2,
  },
  {
      id: 3,
      content: <div>
          <p className="font-bold text-4xl text-white">NBA</p>
          <p className="font-normal text-base text-white"></p>
          <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
              NBA est une série de jeux de simulation de basketball développée par différentes compagnies, offrant aux joueurs la possibilité de vivre l'expérience de la NBA depuis leur console ou leur PC, avec des graphismes réalistes, des modes de jeu variés et la possibilité de contrôler leurs équipes et joueurs préférés.
          </p>
      </div>,
      className: 'col-span-1',
      thumbnail: img3,
  },
  {
      id: 4,
      content: <div>
          <p className="font-bold text-4xl text-white">Minecraft</p>
          <p className="font-normal text-base text-white"></p>
          <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
              Minecraft est un jeu vidéo de type bac à sable, permettant aux joueurs de construire et d'explorer des mondes virtuels en blocs pixelisés, offrant une grande liberté de création et d'aventure, avec des modes de jeu variés tels que le mode survie, le mode créatif et le mode multijoueur.
          </p>
      </div>,
      className: 'col-span-2',
      thumbnail: img4,
  },
  {
      id: 5,
      content: <div>
          <p className="font-bold text-4xl text-white">League of Legends</p>
          <p className="font-normal text-base text-white"></p>
          <p className="font-normal text-base my-4 max-w-lg text-neutral-200">

              League of Legends (LoL) est un jeu vidéo de type MOBA (Multiplayer Online Battle Arena), où deux équipes de champions uniques s'affrontent pour détruire la base adverse. Chaque joueur contrôle un champion avec des compétences spécifiques, et le jeu combine stratégie, compétences et coopération pour remporter la victoire.
          </p>
      </div>,
      className: 'col-span-2',
      thumbnail: img5,
  },
  {
      id: 6,
      content: <div>
          <p className="font-bold text-4xl text-white">Fortnite</p>
          <p className="font-normal text-base text-white"></p>
          <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
              Fortnite est un jeu vidéo de type battle royale développé par Epic Games, où jusqu'à 100 joueurs s'affrontent pour être le dernier survivant dans un environnement en constante évolution. Il offre également un mode de jeu créatif où les joueurs peuvent construire leurs propres mondes et des modes de jeu variés pour une expérience de jeu diversifiée.
          </p>
      </div>,
      className: 'col-span-1',
      thumbnail: img6,
  },
  {
      id: 7,
      content: <div>
          <p className="font-bold text-4xl text-white">Counter-Strike</p>
          <p className="font-normal text-base text-white"></p>
          <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
              Counter-Strike est une série de jeux de tir à la première personne multijoueur, où deux équipes, les terroristes et les forces spéciales (contre-terroristes), s'affrontent dans des scénarios variés. Les joueurs doivent remplir des objectifs tels que la pose ou la désamorçage de bombes, ou la sauvegarde ou le sauvetage d'otages, tout en utilisant des armes et en faisant preuve de stratégie pour remporter la victoire.
          </p>
      </div>,
      className: 'col-span-1',
      thumbnail: img7,
  },
  {
      id: 8,
      content: <div>
          <p className="font-bold text-4xl text-white">Valorant</p>
          <p className="font-normal text-base text-white"></p>
          <p className="font-normal text-base my-4 max-w-lg text-neutral-200">

              Valorant est un jeu vidéo de tir à la première personne (FPS) développé par Riot Games. Dans Valorant, deux équipes de cinq joueurs s'affrontent pour accomplir des objectifs sur une carte. Chaque joueur incarne un agent avec des compétences uniques, et le jeu combine l'habileté des tirs avec des éléments tactiques pour offrir une expérience compétitive intense.
          </p>
      </div>,
      className: 'col-span-2',
      thumbnail: img8,
  },
];
export const LayoutGrid = () => {
  const [selected, setSelected] = useState<Card | null>(null);
  const [lastSelected, setLastSelected] = useState<Card | null>(null);
 
  const handleClick = (card: Card) => {
    setLastSelected(selected);
    setSelected(card);
  };
 
  const handleOutsideClick = () => {
    setLastSelected(selected);
    setSelected(null);
  };
 
  return (
    <div style={{
        // minHeight: `calc(100vh - ${heightHeader})`, 
    }}
 className="mx-auto min-h-96 w-10/12 grid grid-rows-3 grid-cols-3 md:grid-cols-3  md:max-w-7xl  gap-4 flex-grow ">
      {cards.map((card, i) => (
        <div key={i} className={cn(card.className, " w-full")}>
          <motion.div
            onClick={() => handleClick(card)}
            className={cn(
              card.className,
              "relative overflow-hidden ",
              selected?.id === card.id
                ? "rounded-lg cursor-pointer absolute inset-0 h-1/2 w-full md:w-1/2 m-auto z-50 flex justify-center items-center flex-wrap flex-col"
                : lastSelected?.id === card.id
                ? "z-40 bg-white rounded-xl h-full w-full"
                : "bg-white rounded-xl h-full w-full"
            )}
            layout
          >
            {selected?.id === card.id && <SelectedCard selected={selected} />}
            <BlurImage card={card} />
          </motion.div>
        </div>
      ))}
      <motion.div
        onClick={handleOutsideClick}
        className={cn(
          "absolute h-full w-full left-0 top-0 bg-black opacity-0 z-10",
          selected?.id ? "pointer-events-auto" : "pointer-events-none"
        )}
        animate={{ opacity: selected?.id ? 0.3 : 0 }}
      />
    </div>
  );
};
 
const BlurImage = ({ card }: { card: Card }) => {
  const [loaded, setLoaded] = useState(false);
  return (
    <img
      src={card.thumbnail}
      onLoad={() => setLoaded(true)}
      className={cn(
        "object-cover object-center absolute inset-0 h-full w-full transition duration-200",
        loaded ? "blur-none" : "blur-md"
      )}
      alt="thumbnail"
    />
  );
};
 
const SelectedCard = ({ selected }: { selected: Card | null }) => {
  return (
    <div className="bg-transparent h-full w-full flex flex-col justify-end rounded-lg shadow-2xl relative z-[60]">
      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 0.6,
        }}
        className="absolute inset-0 h-full w-full bg-black opacity-60 z-10"
      />
      <motion.div
        initial={{
          opacity: 0,
          y: 100,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.3,
          ease: "easeInOut",
        }}
        className="relative px-8 pb-4 z-[70]"
      >
        {selected?.content}
      </motion.div>
    </div>
  );
};