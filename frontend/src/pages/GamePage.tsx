import { Stack } from '@mui/material';
import { TypewriterEffectSmooth } from '../components/ui/typewriter-effect';
import LogoTeamateIcon from '../components/Logo/LogoTeamateIcon';
const heightHeader = 200;
const BOTTOM_NAVIGATION_HEIGHT = 56;


export default function GamePage(): JSX.Element {
    const words = [
        {
            text: 'En',
        },
        {
            text: 'cours',
        },
        {
            text: 'de',
        },
        {
            text: 'développement.',
            className: 'text-orangePV-900 dark:text-orangePV-900',
        },
    ];
    return (

        <Stack
            sx={{
                minHeight: `calc(100dvh - ${heightHeader + BOTTOM_NAVIGATION_HEIGHT}px)`,
            }} direction={"column"} alignItems={'center'} justifyContent={"center"}>
            <LogoTeamateIcon
                sx={{
                    width: '5rem',
                    height: '100%',
                    marginBottom: '1rem',
                }} />
            <div style={{ position: 'relative', zIndex: 10 }}>
                <TypewriterEffectSmooth speed={{ delay: 0.2, duration: 1 }} words={words} />
            </div>



        </Stack>

    );
}
