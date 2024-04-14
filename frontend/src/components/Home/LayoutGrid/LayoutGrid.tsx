"use client";
import React, { useCallback, useEffect, useState, } from "react";

import { motion } from "framer-motion";

import { cn } from "../../../utils/cn.ts";
import img1 from './../../../assets/imgGames/assassin.jpg';
import img3 from './../../../assets/imgGames/nba.jpeg';
import img4 from './../../../assets/imgGames/Minecraft.jpg';
import img2 from './../../../assets/imgGames/apex.jpg';
import img5 from './../../../assets/imgGames/league.jpg';
import img6 from './../../../assets/imgGames/fornite.jpg';
import img7 from './../../../assets/imgGames/CS.jpg';
import img8 from './../../../assets/imgGames/Valorant.jpeg';
import img9 from './../../../assets/imgGames/warzone.jpg';
import img10 from './../../../assets/imgGames/red dead.jpg';
import img11 from './../../../assets/imgGames/destiny2.jpg';

type Card = {
  id: number;
  content: React.ReactNode;
  className: string;
  thumbnail: string;
};

export const LayoutGrid = () => {
  const [cards, setCards] = useState<Card[]>([
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
      className: 'col-span-3',
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
      className: 'col-span-3',
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
      className: 'col-span-1',
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
      className: 'col-span-3',
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
    {
      id: 9,
      content: <div>
        <p className="font-bold text-4xl text-white">Call of Duty</p>
        <p className="font-normal text-base text-white"></p>
        <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
          Call of Duty est une série de jeux de tir à la première personne (FPS) développée par Activision, offrant aux joueurs une expérience de guerre réaliste à travers différentes époques historiques et des scénarios variés. Les jeux de la série proposent des modes de jeu solo, multijoueur et coopératif, avec des graphismes réalistes et un gameplay intense.
        </p>
      </div>,
      className: 'col-span-3',
      thumbnail: img9,
    
  },

    {
      id: 10,
      content: <div>
        <p className="font-bold text-4xl text-white">Red Dead Redemption</p>
        <p className="font-normal text-base text-white"></p>
        <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
          Red Dead Redemption est une série de jeux vidéo d'action-aventure en monde ouvert développée par Rockstar Games, offrant aux joueurs la possibilité de vivre l'expérience de l'Ouest américain à travers des histoires épiques, des combats intenses et des environnements vastes et détaillés.
        </p>
      </div>,
      className: 'col-span-2',
      thumbnail: img10,
    },
    {
      id: 11,
      content: <div>
        <p className="font-bold text-4xl text-white">Destiny 2</p>
        <p className="font-normal text-base text-white"></p>
        <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
          Destiny 2 est un jeu vidéo de tir à la première personne (FPS) en ligne développé par Bungie, offrant aux joueurs une expérience de jeu de tir coopératif et compétitif dans un univers de science-fiction riche et varié. Les joueurs peuvent explorer des mondes vastes, combattre des ennemis redoutables et participer à des événements multijoueurs pour gagner des récompenses et améliorer leur équipement.
        </p>
      </div>,
      className: 'col-span-3',
      thumbnail: img11,
    },
  ]);

  const TOTAL_COLUMNS = 5; // Pour md:grid-cols-5

  const getColSpan = (className: string) => {
    const match = className.match(/col-span-(\d)/);
    return match ? parseInt(match[1], 10) : 1;
  };

  const shuffleAndDistributeCards = useCallback((array: Card[]): Card[] => {
    // Mélangez les cartes
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }

    // Distribuez les cartes dans la grille
    const gridArray: Card[] = [];
    let currentRowSpan = 0;

    shuffledArray.forEach(card => {
      const cardColSpan = getColSpan(card.className);
      if (currentRowSpan + cardColSpan > TOTAL_COLUMNS) {
        // Si l'ajout de cette carte dépasse le nombre total de colonnes, réinitialisez le compteur
        currentRowSpan = cardColSpan;
      } else {
        // Sinon, ajoutez simplement le col-span de cette carte au compteur
        currentRowSpan += cardColSpan;
      }
      gridArray.push(card);
    });

    if (currentRowSpan !== TOTAL_COLUMNS) {
      currentRowSpan = 0; // Réinitialisez currentRowSpan si nécessaire
    }

    return gridArray;
  }, []);

  useEffect(() => {
    // Mélangez et distribuez les cartes à intervalles réguliers
    const interval = setInterval(() => {
      setCards(cards => shuffleAndDistributeCards(cards));
    }, 6000 + Math.random() * 10000);
    return () => clearInterval(interval);
  }, [shuffleAndDistributeCards]);

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
    <div className="mx-auto gap-3 min-h-96 w-full grid grid-cols-3 md:grid-cols-5 md:max-w-7xl flex-grow">
      {cards.map((card, index) => (
        <div key={index} className={`grid-item ${card.className}`}>
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