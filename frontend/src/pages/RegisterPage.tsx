import React, { useEffect, useState } from 'react';
import { Box, Button, Link, MenuItem, Stack, TextField, ThemeProvider, Typography, alpha, styled } from "@mui/material";
import { Link as RouterLink } from 'react-router-dom';
import customTheme from '../styles/customTheme'
import LogoTeamateIcon from '../components/Logo/LogoTeamateIcon';

const StyledTypography = styled(Typography)(() => ({
    color: customTheme.palette.slate[200],

    '&.MuiTypography-root.MuiTypography-h1': {
        fontWeight: 600,
        [customTheme.breakpoints.down('lg')]: {
            fontSize: customTheme.typography.h3.fontSize,
            lineHeight: customTheme.typography.h3.lineHeight
        },
        [customTheme.breakpoints.down('md')]: {
            fontSize: customTheme.typography.h4.fontSize,
            lineHeight: customTheme.typography.h4.lineHeight,
        },
    },
    '&.MuiTypography-root.MuiTypography-body2': {
        fontSize: customTheme.typography.subtitle2.fontSize,
        lineHeight: customTheme.typography.subtitle2.lineHeight,
        [customTheme.breakpoints.down('lg')]: {
        },
        [customTheme.breakpoints.down('md')]: {
            fontSize: customTheme.typography.subtitle2.fontSize,
            lineHeight: customTheme.typography.subtitle2.lineHeight,
        },
    },
    '&.MuiTypography-root.MuiTypography-subtitle2': {
        fontSize: customTheme.typography.caption.fontSize,
        lineHeight: customTheme.typography.caption.lineHeight,
        [customTheme.breakpoints.down('lg')]: {
        },
        [customTheme.breakpoints.down('md')]: {
            margin: customTheme.spacing(2, 0),
            fontSize: customTheme.typography.caption.fontSize,
            lineHeight: customTheme.typography.caption.lineHeight,
        },
    },



}));

const StyledTextField = styled(TextField)(() => ({
    '& .MuiInputBase-root': {
        color: customTheme.palette.slate[200],
        '&::before': {
            borderBottom: `1px solid ${customTheme.palette.slate[200]}`,
        },
    },

    '& .MuiFilledInput-root': {
        backgroundColor: alpha(customTheme.palette.slate[800], 0.1),
        '&:hover': {
            backgroundColor: customTheme.palette.purplePV.light,
        },
    },
    '& .MuiInputLabel-root': {
        color: alpha(customTheme.palette.slate[200], 0.7),

        '&.MuiInputLabel-shrink': {
            color: customTheme.palette.orangePV.dark,
        },
    },
    '& .MuiSvgIcon-root': {
        color: customTheme.palette.slate[200],
    },
}));

const StyledButton = styled(Button)(() => ({
    '&.MuiButton-root': {
        color: customTheme.palette.slate[200],
        margin: customTheme.spacing(4, 0),
        width: '30ch',
        fontWeight: 600,
        '&:hover': {
            backgroundColor: customTheme.palette.orangePV.light,
        },
        [customTheme.breakpoints.down('md')]: {
            width: '100%',
            fontSize: customTheme.typography.body2.fontSize,
            lineHeight: customTheme.typography.body2.lineHeight,
        },
    },
}));

const steps = [
    { label: 'Email', name: 'email', error: 'Une adresse email valide est requise' },
    { label: 'Username', name: 'username', error: 'Le nom d\'utilisateur doit contenir entre 3 et 20 caractères' },
    { label: 'Genre', name: 'gender', error: 'Genre invalide' },
    { label: 'Mot de passe', name: 'password', error: 'Le mot de passe doit contenir au moins 8 caractères et au moins une lettre majuscule, une lettre minuscule, un chiffre et un caractère spécial' },
    { label: 'Confirmation du mot de passe', name: 'confirmPassword', error: 'Les mots de passe ne correspondent pas' },
];

export default function RegisterPage() {
    const [formData, setFormData] = useState({
        email: '',
        username: '',
        gender: '',
        password: '',
        confirmPassword: '',
    });
    const [formError, setFormError] = useState({
        email: '',
        username: '',
        gender: '',
        password: '',
        confirmPassword: '',
    });

    useEffect(() => {
        console.log('formData', formData);
    }, [formData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<{ name?: string; value: unknown }>) => {
        const { name, value } = e.target as { name: string, value: string };
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        // Préparer un objet pour les erreurs potentielles
        const newErrors = {
            email: '',
            username: '',
            gender: '',
            password: '',
            confirmPassword: '',
        };

        // Vérifier tous les champs
        if (!formData.email) {
            newErrors.email = steps[0].error;
        }
        if (!formData.username) {
            newErrors.username = steps[1].error;
        }
        if (!formData.password) {
            newErrors.password = steps[3].error;
        }
        if (!formData.confirmPassword) {
            newErrors.confirmPassword = steps[4].error;
        }
        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = steps[4].error;
        }
        if (!formData.gender) {
            newErrors.gender = steps[2].error;
        }

        // Mettre à jour l'état des erreurs avec les nouvelles erreurs
        setFormError(newErrors);

        // Vérifier si le formulaire est valide
        const isValid = Object.values(newErrors).every(error => error === '');

        if (isValid) {
            console.log('form valid');
            // Soumettre le formulaire ou effectuer d'autres actions
        }
    };

    return (
        <ThemeProvider theme={customTheme}>
            <Stack direction={'column'} justifyContent={{ xs: 'center', md: 'initial' }} alignItems={{ xs: 'center', md: 'initial' }} padding={{ xs: 0, md: customTheme.spacing(4, 0, 0, 4) }} minHeight={'100vh'} spacing={{ xs: 2, md: 4 }}>
                <Stack sx={{
                    backgroundColor: alpha(customTheme.palette.slate[200], 0.1),
                    padding: customTheme.spacing(4),
                    borderRadius: customTheme.spacing(2),
                    width: 'fit-content',
                }}>
                    <Stack direction={'row'} alignItems={'flex-end'} marginBottom={customTheme.spacing(2)}>
                        <LogoTeamateIcon
                            id="md"
                            href='/'
                            sx={{
                                width: '3rem',
                                height: '100%',
                            }}
                        />
                        <Link
                            variant="h5"
                            noWrap
                            href="/"
                            sx={{
                                fontWeight: 700,
                                letterSpacing: '.1rem',
                                color: 'transparent',
                                textDecoration: 'none',
                                background: 'linear-gradient(90deg, #E9695B, #E7378B, #F4BE5C)',
                                backgroundSize: '200% auto',
                                WebkitBackgroundClip: 'text',
                                backgroundClip: 'text',
                                animation: 'gradient 3s linear infinite',
                                '@keyframes gradient': {
                                    '0%': { backgroundPosition: '0% 50%' },
                                    '50%': { backgroundPosition: '100% 50%' },
                                    '100%': { backgroundPosition: '0% 50%' },
                                },
                            }}
                        >
                            eamate
                        </Link>
                    </Stack>
                    <StyledTypography gutterBottom variant="h1">Créez un compte</StyledTypography>
                    <Box maxWidth={{ xs: '100%', md: '470px' }} width={'100%'} component={'form'} onSubmit={handleSubmit}>
                        <Stack spacing={2}>
                            {steps.map(step => (
                                step.name === 'gender' ? (
                                    <StyledTextField
                                        color="primary"
                                        label={step.label}
                                        variant='filled'
                                        name={step.name}
                                        value={formData[step.name as keyof typeof formData]}
                                        onChange={handleChange}
                                        error={formError[step.name as keyof typeof formError] !== ''}
                                        helperText={formError[step.name as keyof typeof formError]}
                                        select
                                    >
                                        <MenuItem value=""><em>Genre</em></MenuItem>
                                        <MenuItem value="male">Homme</MenuItem>
                                        <MenuItem value="female">Femme</MenuItem>
                                    </StyledTextField>
                                ) : (
                                    <StyledTextField
                                        color="primary"
                                        label={step.label}
                                        variant="filled"
                                        name={step.name}
                                        value={formData[step.name as keyof typeof formData]}
                                        onChange={handleChange}
                                        error={formError[step.name as keyof typeof formError] !== ''}
                                        helperText={formError[step.name as keyof typeof formError]}
                                    />
                                )
                            ))}
                        </Stack>
                        <StyledButton
                            variant="contained"
                            color="primary"
                            type="submit">
                            S'inscrire
                        </StyledButton>
                        <StyledTypography gutterBottom variant={'body2'}>
                            Vous avez déjà un compte ? <Link color={'primary'} fontWeight={600} component={RouterLink} underline={'hover'} to={'/login'}>Connectez-vous</Link>
                        </StyledTypography>
                        <StyledTypography variant={'subtitle2'}>
                            En cliquant sur "S'inscrire", vous acceptez les <Link color={'primary'} fontWeight={600} component={RouterLink} underline={'hover'} to={'/'}>Conditions d'utilisation</Link> et la <Link color={'primary'} fontWeight={600} component={RouterLink} underline={'hover'} to={'/'}>Politique de confidentialité</Link> de Nomad.
                        </StyledTypography>
                    </Box>
                </Stack>
            </Stack>
        </ThemeProvider>
    );
}