import { InfinitScroll } from '../components/InfinitScroll/InfinitScroll.tsx';
import HeaderProfil from '../components/Profil/HeaderProfil.tsx';
import { BlockPublication } from '../components/Profil/BlockPublication.tsx';
import { Stack, useMediaQuery } from '@mui/material';
import customTheme, { bottomNavigationHeight, heightHeader } from '../styles/customTheme';
import LeftBlockProfil from '../components/BiographyProfil/LeftBlockProfil.tsx';
import RightBlockProfil from '../components/BiographyProfil/RightBlockProfil.tsx';

export default function Profil() {
    const isSmUp = useMediaQuery(customTheme.breakpoints.up('sm'));
    const isMd = useMediaQuery(customTheme.breakpoints.between('md', 'lg'));
    const isMdUp = useMediaQuery(customTheme.breakpoints.up('md'));
    const isMdDown = useMediaQuery(customTheme.breakpoints.down('md'));
    const isLgUp = useMediaQuery(customTheme.breakpoints.up('lg'));

    // Assurez-vous que heightHeader et bottomNavigationHeight sont en pixels
    const heightHeaderPx = `${heightHeader}px`;
    const bottomNavigationHeightPx = `${bottomNavigationHeight}px`;

    const heightHeaderProfil = '96px';
    let heightInfinitScroll = '112px';

    if (isSmUp) heightInfinitScroll = '144px'; // Lorsque la largeur est supérieure à sm
    if (isMd || isLgUp) heightInfinitScroll = '160px'; // Lorsque la largeur est entre md et lg

    let totalHeight = `calc(100dvh - (${heightHeaderPx} + ${bottomNavigationHeightPx} + ${heightInfinitScroll}))`;
    if (isMdUp) totalHeight = `calc(100dvh - (${heightHeaderPx} + ${heightInfinitScroll}))`;

    const totalHeightWithout = `calc(${totalHeight} - ${heightHeaderProfil})`;

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
                    <Stack component="section" sx={commonBoxStyles}>
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
                    </Stack>
                )}
                {isLgUp && (
                    <Stack component="section" sx={commonBoxStyles}>
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
                    </Stack>
                )}
            </Stack>
            <InfinitScroll />
        </>
    );
}