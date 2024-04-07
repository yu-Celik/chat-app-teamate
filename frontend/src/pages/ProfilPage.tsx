
import { InfinitScroll } from '../components/InfinitScroll/InfinitScroll.tsx';
import HeaderProfil from '../components/Profil/HeaderProfil.tsx';
import { BlockPublication } from '../components/Profil/BlockPublication.tsx';
import LabelBottomNavigation from '../components/BottomNavigation/BottomNavigation.tsx';
import { Stack } from '@mui/material';
const valeurNavigation = '124.5px';


export default function Profil() {
    return (
        <Stack
            sx={{
                maxHeight: `calc(100dvh - ${valeurNavigation})`,
            }}
        >
            <HeaderProfil />
            <BlockPublication />
            <InfinitScroll />   
            <LabelBottomNavigation />
        </Stack>
    )
}