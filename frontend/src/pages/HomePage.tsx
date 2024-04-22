import { Box, Stack, useMediaQuery } from "@mui/material";
import { InfinitScrollAccueil } from "../components/InfinitScroll/InfinitScrollAccueil";
import SearchFast from "../components/Home/SearchFast/SearchFast";
import { heightHeader } from "../styles/customTheme";
import customTheme from "../styles/customTheme";
import img9 from './../assets/imgGames/fornite.jpg';
import img10 from './../assets/imgGames/gta.jpg';
import img11 from './../assets/imgGames/league.jpg';
import img12 from './../assets/imgGames/Minecraft.jpg';
import img13 from './../assets/imgGames/nba.jpeg';
import img14 from './../assets/imgGames/nfs.jpg';
import img15 from './../assets/imgGames/overatch.jpeg';
import img16 from './../assets/imgGames/red dead.jpg';
import img17 from './../assets/imgGames/rocket.jpg';
import img18 from './../assets/imgGames/teamfight-tactics.jpg';
import img19 from './../assets/imgGames/Valorant.jpeg';
import img20 from './../assets/imgGames/warzone.jpg';
import AnimatedImages from "../components/Home/LayoutGrid/LayoutGrid";
const SkeletonOne = () => {
    return (
        <div>
            <p className="font-bold text-4xl text-white">House in the woods</p>
            <p className="font-normal text-base text-white">Enjoy the silence and beauty of nature in your own private getaway.</p>
            <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
                A serene and tranquil retreat, this house in the woods offers a peaceful
                escape from the hustle and bustle of city life.
            </p>
        </div>
    );
};

const SkeletonTwo = () => {
    return (
        <div>
            <p className="font-bold text-4xl text-white">Lakefront Cabin</p>
            <p className="font-normal text-base text-white">Perfect spot for fishing, boating, and waterfront picnics.</p>
            <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
                Experience breathtaking views and relaxing sounds of the lake at this
                charming lakefront cabin.
            </p>
        </div>
    );
};

const SkeletonThree = () => {
    return (
        <div>
            <p className="font-bold text-4xl text-white">Mountain Retreat</p>
            <p className="font-normal text-base text-white">Ideal for hiking enthusiasts and nature lovers.</p>
            <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
                Nestled high in the mountains, this retreat offers spectacular vistas and
                direct access to trails.
            </p>
        </div>
    );
};


const images = [
    { src: img9, alt: 'Fornite', id: 1, content: <SkeletonOne /> },
    { src: img12, alt: 'Minecraft', id: 4, content: <SkeletonTwo /> },
    { src: img10, alt: 'GTA', id: 2, content: <SkeletonThree /> },
    { src: img16, alt: 'Red Dead Redemption 2', id: 8, content: <SkeletonOne /> },
    { src: img11, alt: 'League of Legends', id: 3, content: <SkeletonTwo /> },
    { src: img13, alt: 'NBA', id: 5, content: <SkeletonThree /> },
    { src: img20, alt: 'Warzone', id: 12, content: <SkeletonOne /> },
    { src: img17, alt: 'Rocket League', id: 9, content: <SkeletonTwo /> },
    { src: img18, alt: 'Teamfight Tactics', id: 10, content: <SkeletonThree /> },
    { src: img15, alt: 'Overatch', id: 7, content: <SkeletonOne /> },
    { src: img14, alt: 'NFS', id: 6, content: <SkeletonTwo /> },
    { src: img19, alt: 'Valorant', id: 11, content: <SkeletonThree /> },
];

const HomePage = () => {
    const isMdUp = useMediaQuery(customTheme.breakpoints.up('md'));
    const isLgUp = useMediaQuery(customTheme.breakpoints.up('lg'));
    const isXlUp = useMediaQuery(customTheme.breakpoints.up('xl'));
    return (
        <Stack
            sx={{
                maxWidth: '1537px',
                minHeight: `calc(100dvh - ${heightHeader}px)`,
                margin: isXlUp ? '0 auto' : '0',
                marginBottom: isMdUp ? 0 : '3rem',
            }}
        >
            <Stack
                flexDirection={{ xs: 'column', md: 'row' }}
                alignItems={'center'}
            >
                <Box width={{ xs: '100%', md: '50%' }} display={'flex'} justifyContent={'center'} marginTop={isLgUp ? 0 : 2}>
                    <SearchFast />
                </Box>
                <Box width={{ xs: '100%', md: '50%' }} display={'flex'} justifyContent={'center'} alignItems={'center'} marginTop={2}>
                    <AnimatedImages initialImages={images} />
                </Box>
            </Stack>
            <InfinitScrollAccueil />
        </Stack >
    );
}

export default HomePage;