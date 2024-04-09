import { Stack } from '@mui/material';
import { TypewriterEffectSmooth } from '../components/ui/typewriter-effect';
import LogoTeamateIcon from '../components/Logo/LogoTeamateIcon';
import LabelBottomNavigation from '../components/BottomNavigation/BottomNavigation';
import { bottomNavigationHeight, heightHeader } from '../styles/customTheme';

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
                minHeight: `calc(100vh - ${heightHeader + bottomNavigationHeight})`,
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
            <LabelBottomNavigation />



        </Stack>

    );
}
