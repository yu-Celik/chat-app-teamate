import img1 from './../../assets/imgGames/assassin.jpg';
import img2 from './../../assets/imgGames/apex.jpg';
import img3 from './../../assets/imgGames/battlefield.jpg';
import img4 from './../../assets/imgGames/CS.jpg';
import img5 from './../../assets/imgGames/destiny2.jpg';
import img6 from './../../assets/imgGames/fifa.jpg';
import img7 from './../../assets/imgGames/fornite.jpg';
import img8 from './../../assets/imgGames/gta.jpg';
import img9 from './../../assets/imgGames/league.jpg';
import img10 from './../../assets/imgGames/Minecraft.jpg';
import img11 from './../../assets/imgGames/overatch.jpeg';
import img12 from './../../assets/imgGames/nba.jpeg';
import img13 from './../../assets/imgGames/nfs.jpg';
import img14 from './../../assets/imgGames/red dead.jpg';
import img15 from './../../assets/imgGames/Valorant.jpeg';

import { InfiniteMovingCards } from '../ui/infinite-moving-cards';



export const InfinitScroll = () => {
    const image = [
        { src: img1 },
        { src: img15 },
        { src: img11 },
        { src: img2 },
        { src: img9 },
        { src: img10 },
        { src: img3 },
        { src: img4 },
        { src: img5 },
        { src: img6 },
        { src: img7 },
        { src: img8 },
        { src: img12 },
        { src: img13 },
        { src: img14 },
    ];
    return (
        <InfiniteMovingCards className='max-w-screen-2xl ' items={image} />
    );
};