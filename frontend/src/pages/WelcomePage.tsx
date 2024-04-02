import { Box, styled } from '@mui/material';

import { Button } from '../components/ui/moving-border';
import { TypewriterEffectSmooth } from '../components/ui/typewriter-effect';
import { Link as RouterLink } from 'react-router-dom';
import LogoTeamateIcon from '../components/Logo/LogoTeamateIcon';

const StyledBox = styled(Box)({
    width: '10rem',
    height: '2.5rem',
    borderRadius: '1rem',
    backgroundColor: 'rgba(243, 129, 99, 0.9)',
    border: '1px solid #000000',
    fontSize: '0.875rem',
    textTransform: 'capitalize',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    textDecoration: 'none',
    '&:hover': {
        backgroundColor: 'rgba(243, 129, 99, 0.7)',
    },
});

export default function Welcome(): JSX.Element {
    const words = [
        {
            text: 'Bienvenue',
        },
        {
            text: 'sur',
        },
        {
            text: 'votre',
        },
        {
            text: 'plateforme',
        },
        {
            text: 'Teamate.',
            className: 'text-orangePV-900 dark:text-orangePV-900',
        },
    ];
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient ">
            <LogoTeamateIcon
                sx={{
                    width: '5rem',
                    height: '100%',
                    marginBottom: '1rem',
                }}
            />
            <p className="text-neutral-600 dark:text-neutral-200 text-base sm:text-lg md:text-xl text-center mb-4">
                Votre aventure de jeu commence ici
            </p>
            <TypewriterEffectSmooth words={words} />
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4 mt-10">
                <RouterLink to="/login">
                    <StyledBox>
                        Login !
                    </StyledBox>
                </RouterLink>
                <Button as={RouterLink} to="/register"
                    borderRadius="0.75rem"
                    className="rounded-xl bg-transparant text-white border border-bluePV-100 text-sm hover:bg-purplePV-100"
                >
                    Join now
                </Button>
            </div>
        </div>

    );
}
