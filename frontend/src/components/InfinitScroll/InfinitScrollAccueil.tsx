
import { useMediaQuery } from '@mui/material';
import { InfiniteMovingCards } from '../ui/infinite-moving-cards';
import customTheme from '../../styles/customTheme';


export const InfinitScrollAccueil = () => {
  const image = [

    {
      id: 1,
      quote: "Qui pour game ce soir ??? :)",
      name: "HDZ",
    },
    {
      id: 2,
      quote: "Pourquoi non Véronique ? Pourquoi voooouus vous dites non ??",
      name: "Farfromyu",
    },
    {
      id: 3,
      quote: "Je suis désolé d'avoir forcé pour qu'on passe sur VSCode...",
      name: "Fatal.Xxl",
    },
    {
      id: 4,
      quote: "Vite samedi pour voir Jasmine... Je vais lui faire une syntaxe :P",
      name: "Anthony",
    },
    {
      id: 5,
      quote: "SVP ! Quelqu'un sait ce qu'on doit faire ?",
      name: "Mohamed",
    },
    {
      id: 6,
      quote: "Putains ! le chnoiw il est dead !",
      name: "Aïmane",
    },
    {
      id: 7,
      quote: "Bingo ! j'ai un axe d'amelioration ! BREF ! Il reste 18min et 42sec avant 16h00 :'( ",
      name: "Cintre",
    },
  ];
  const isSmUp = useMediaQuery(customTheme.breakpoints.up('sm'));

  return (
    <InfiniteMovingCards className='max-w-screen-2xl xl:mx-auto scrollbar-none' direction="left" pauseOnHover={isSmUp} speed="slow" items={image} />
    );
};

