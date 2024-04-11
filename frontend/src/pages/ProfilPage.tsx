import { InfinitScroll } from '../components/InfinitScroll/InfinitScroll.tsx';
import HeaderProfil from '../components/Profil/HeaderProfil.tsx';
import { BlockPublication } from '../components/Profil/BlockPublication.tsx';
import { Box, Stack, useMediaQuery } from '@mui/material';
import customTheme, { bottomNavigationHeight, heightHeader } from '../styles/customTheme';
import LeftBlockProfil from '../components/BiographyProfil/LeftBlockProfil.tsx';
import RightBlockProfil from '../components/BiographyProfil/RightBlockProfil.tsx';

export default function Profil() {
    const isSmUp = useMediaQuery(customTheme.breakpoints.up('sm'));
    const isMd = useMediaQuery(customTheme.breakpoints.between('md', 'lg'));
    const isMdDown = useMediaQuery(customTheme.breakpoints.down('md'));
    const isLgUp = useMediaQuery(customTheme.breakpoints.up('lg'));

    const heightHeaderProfil = isMd || isLgUp ? '80' : '64';
    let heightInfinitScroll = '112px';

    if (isSmUp) heightInfinitScroll = '144px';
    if (isMd || isLgUp) heightInfinitScroll = '160px';

    let totalHeight = `calc(100vh - ${heightHeader + bottomNavigationHeight + parseFloat(heightInfinitScroll)}px)`;
    if (isSmUp) totalHeight = `calc(100vh - ${heightHeader + parseFloat(heightInfinitScroll)}px)`;


    const totalHeightWithout = `calc(${totalHeight} - ${parseFloat(heightHeaderProfil)}px)`;

    const commonBoxStyles = {
        maxWidth: '1537px',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'stretch',
        minHeight: '100%',
        maxHeight: totalHeightWithout,
        margin: '0 auto',
        padding: '0 1rem'
    };

    return (
        <>
            <Stack sx={{ maxHeight: totalHeight }}>
                <HeaderProfil />
                {isMdDown && (
                    <BlockPublication />

                )}
                {isMd && (
                    <Box component="section" sx={commonBoxStyles}>
                        <LeftBlockProfil />
                        <Stack
                            sx={{
                                overflow: 'auto',
                                maxHeight: totalHeightWithout,
                                flexShrink: 0.1,
                            }}
                        >
                            <BlockPublication />
                        </Stack>
                    </Box>
                )}
                {isLgUp && (
                    <Box component="section" sx={commonBoxStyles}>
                        <LeftBlockProfil />
                        <Stack
                            sx={{
                                overflow: 'auto',
                                maxHeight: totalHeightWithout,
                                flexShrink: 0,
                                flexGrow: 3,
                            }}
                        >
                            <BlockPublication />
                        </Stack>
                        <RightBlockProfil />

                    </Box>
                )}
            </Stack>
            <InfinitScroll />
        </>
    );
}