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
import customTheme from '../../styles/customTheme';
import { InfiniteMovingCards } from '../ui/infinite-moving-cards';
import { useMediaQuery } from '@mui/material';



export const InfinitScroll = () => {
    const image = [
        { id: 1, src: img1 },
        { id: 2, src: img15 },
        { id: 3, src: img11 },
        { id: 4, src: img2 },
        { id: 5, src: img9 },
        { id: 6, src: img10 },
        { id: 7, src: img3 },
        { id: 8, src: img4 },
        { id: 9, src: img5 },
        { id: 10, src: img6 },
        { id: 11, src: img7 },
        { id: 12, src: img8 },
        { id: 13, src: img12 },
        { id: 14, src: img13 },
        { id: 15, src: img14 },
    ];

    const isSmUp = useMediaQuery(customTheme.breakpoints.up('sm'));
    return (
        <InfiniteMovingCards className='max-w-screen-2xl xl:mx-auto' direction="right" pauseOnHover={isSmUp} speed="slow" items={image} />
    );
};

