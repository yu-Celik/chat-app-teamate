import { Stack } from "@mui/material"
import { LayoutGrid } from "../components/LayoutGrid/LayoutGrid";

import { InfinitScrollAccueil } from "../components/InfinitScroll/InfinitScrollAccueil";
import LabelBottomNavigation from "../components/BottomNavigation/BottomNavigation";

import SearchFast from "../components/SearchFast/SearchFast";
const heightHeader = '68.5px';
const valeurNavigation = '68.5px';


export default function HomePage() {
    return (
        <Stack
            sx={{
                maxHeight: `calc(100dvh - ${heightHeader})`,
            }}
        >
            <Stack
                direction={'column'}
                gap={2}
                sx={{
                    overflow: 'scroll',
                    maxHeight: `calc(100dvh - ${valeurNavigation})`,
                }}
            >
                <SearchFast />
                <InfinitScrollAccueil  />
                <LayoutGrid />

            </Stack>
            <LabelBottomNavigation />
        </Stack>
    )
}