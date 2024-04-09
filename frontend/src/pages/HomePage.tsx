import { Stack, useMediaQuery } from "@mui/material"
import { LayoutGrid } from "../components/LayoutGrid/LayoutGrid";
import { InfinitScrollAccueil } from "../components/InfinitScroll/InfinitScrollAccueil";
import SearchFast from "../components/SearchFast/SearchFast";
const heightHeader = '68.5px';
const valeurNavigation = '68.5px';


export default function HomePage() {
    const matches = useMediaQuery('(min-width:600px)');
    return matches ? (
        <Stack
            sx={{
                maxHeight: `calc(100dvh - ${heightHeader})`,
            }}
        >
            <Stack
                className="flex flex-col gap-2 overflow-y-scroll"
                sx={{
                    maxHeight: `calc(100dvh - ${valeurNavigation})`,
                    padding: '1rem',
                }}
            >
                <Stack
                    direction={'row'}
                    justifyContent={'center'}

                    gap={2}
                >
                    <SearchFast />
                    <LayoutGrid />
                </Stack>
                <InfinitScrollAccueil />
            </Stack>
        </Stack>
    ) : (
        <Stack
            sx={{
                maxHeight: `calc(100dvh - ${heightHeader})`,
            }}
        >
            <Stack
                className="flex flex-col gap-2 overflow-scroll"
                sx={{
                    maxHeight: `calc(100dvh - ${valeurNavigation})`,
                    padding: '1rem',
                }}
            >
                <SearchFast />
                <InfinitScrollAccueil />
                <LayoutGrid />
            </Stack>
        </Stack>
    );
}