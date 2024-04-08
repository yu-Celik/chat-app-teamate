import { InfinitScroll } from '../components/InfinitScroll/InfinitScroll.tsx';
import HeaderProfil from '../components/Profil/HeaderProfil.tsx';
import { BlockPublication } from '../components/Profil/BlockPublication.tsx';
import { Stack } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

export default function Profil() {
    const theme = useTheme();
    const isSmUp = useMediaQuery(theme.breakpoints.up('sm'));
    const isMdUp = useMediaQuery(theme.breakpoints.up('md'));
    const HEIGHT_HEADER = 68.5;
    const BOTTOM_NAVIGATION_HEIGHT = 56;
    let heightInfinitScroll = '112px';

    if (isSmUp) {
        heightInfinitScroll = '160px';
    }
    if (isMdUp) {
        heightInfinitScroll = '176px';
    }
    
    const totalHeight = `calc(100vh - ${HEIGHT_HEADER + BOTTOM_NAVIGATION_HEIGHT + parseFloat(heightInfinitScroll)}px)`;

    return (
        <>
            <Stack
                sx={{
                    maxHeight: totalHeight,
                    
                }}>
                <HeaderProfil />
                <BlockPublication  />
            </Stack>

            <InfinitScroll />
        </>
    );
}