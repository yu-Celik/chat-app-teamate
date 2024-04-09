import { InfinitScroll } from '../components/InfinitScroll/InfinitScroll.tsx';
import HeaderProfil from '../components/Profil/HeaderProfil.tsx';
import { BlockPublication } from '../components/Profil/BlockPublication.tsx';
import { Stack, useMediaQuery } from '@mui/material';
import customTheme, { bottomNavigationHeight, heightHeader } from '../styles/customTheme';

export default function Profil() {
    const isSmUp = useMediaQuery(customTheme.breakpoints.up('sm'));
    const isMdUp = useMediaQuery(customTheme.breakpoints.up('md'));

    let heightInfinitScroll = '112px';

    if (isSmUp) {
        heightInfinitScroll = '144px';
    }
    if (isMdUp) {
        heightInfinitScroll = '159px';
    }
    const totalHeight = `calc(100vh - ${heightHeader + bottomNavigationHeight + parseFloat(heightInfinitScroll)}px)`;


    return (
        <>
            <Stack
                sx={{
                    maxHeight: totalHeight,

                }}>
                <HeaderProfil />
                <BlockPublication />
            </Stack>
            <InfinitScroll />
        </>
    );
}