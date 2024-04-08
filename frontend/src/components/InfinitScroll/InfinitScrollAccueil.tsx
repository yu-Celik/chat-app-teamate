
import { InfiniteMovingCards } from '../ui/infinite-moving-cards';



export const InfinitScrollAccueil = () => {
  const image = [
    {
      quote: "Qui pour game ce soir ??? :)",
      name: "HDZ",
      title: "A Tale of Two Cities",
    },
    {
      quote: "Pourquoi non Véronique ? Pourquoi voooouus vous dites non ??",
      name: "Farfromyu",
      title: "Hamlet",
    },
    {
      quote: "Je suis désolé d'avoir forcé pour qu'on passe sur VSCode...",
      name: "Fatal.Xxl",
      title: "A Dream Within a Dream",
    },
    {
      quote: "Vite samedi pour voir Jasmine... Je vais lui faire une syntaxe :P",
      name: "Anthony",
      title: "Pride and Prejudice",
    },
    {
      quote: "SVP ! Quelqu'un sait ce qu'on doit faire ?",
      name: "Mohamed",
      title: "Moby-Dick",
    },
    {
      quote: "Putains ! le chnoiw il est dead ! J'aurais préféré que ça soit Dom.... #twd",
      name: "Aïmane",
      title: "Moby-Dick",
    },
    {
      quote: "Bingo ! j'ai un axe d'amelioration ! BREF ! Il reste 18min et 42sec avant 16h00 :'( ",
      name: "Cintre",
      title: "Moby-Dick",
    },


  ];
  return (
    <InfiniteMovingCards className='max-w-4xl' items={image} />
  );
};