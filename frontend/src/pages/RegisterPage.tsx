import React, { useEffect, useState } from 'react';
import { Alert, Box, Button, CircularProgress, Link, MenuItem, Stack, TextField, ThemeProvider, Typography, alpha, styled } from "@mui/material";
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import customTheme from '../styles/customTheme'
import LogoTeamateIcon from '../components/Logo/LogoTeamateIcon';
import useAuth from '../contexts/Auth.Context/useAuthContext';
import { RegisterInfo } from '../types/Auth.Context.type/Auth.Context.Props';

const StyledTypography = styled(Typography)(() => ({
    color: customTheme.palette.slate[200],

    '&.MuiTypography-root.MuiTypography-h1': {
        fontWeight: 600,
        fontSize: customTheme.typography.h4.fontSize,
        lineHeight: customTheme.typography.h4.lineHeight,

        [customTheme.breakpoints.up('md')]: {
            fontSize: customTheme.typography.h3.fontSize,
            lineHeight: customTheme.typography.h3.lineHeight
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
            backgroundColor: customTheme.palette.purplePV.dark,
        },
        [customTheme.breakpoints.down('md')]: {
            width: '100%',
            fontSize: customTheme.typography.body2.fontSize,
            lineHeight: customTheme.typography.body2.lineHeight,
            '&:hover': {
                backgroundColor: customTheme.palette.orangePV.dark,
            },
        },
    },
}));



export default function RegisterPage() {
    const { user, isRegistered, isRegisterLoading, isRegisterError, isRegisterInfo, updateRegisterInfo, registerUser } = useAuth();
    const navigate = useNavigate();
    const [registerError, setRegisterError] = useState<RegisterInfo>({
        email: '',
        username: '',
        gender: '',
        password: '',
        confirmPassword: '',
    });

    useEffect(() => {
        if (user !== null) {
            navigate('/');
        }
    }, [user, navigate]);


    // useEffect(() => {
    //     console.log('isRegisterInfo', isRegisterInfo);
    // }, [isRegisterInfo]);

    // useEffect(() => {
    //     console.log('registerError', registerError);
    // }, [registerError]);

    // useEffect(() => {
    //     if (isRegisterError !== null) {
    //         console.log('isRegisterError', isRegisterError);
    //     }
    // }, [isRegisterError]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<{ name?: string; value: unknown }>) => {
        const { name, value } = e.target as { name: string, value: string };
        updateRegisterInfo({ ...isRegisterInfo, [name]: value });
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        // Créer une copie locale de registerError pour vérifier les erreurs
        const errors = {
            email: '',
            username: '',
            gender: '',
            password: '',
            confirmPassword: '',
        };

        // Vérifier tous les champs et mettre à jour la copie locale des erreurs
        if (isRegisterInfo.email === '') {
            errors.email = 'Veuillez saisir une adresse email';
        }
        if (isRegisterInfo.username === '') {
            errors.username = 'Veuillez saisir un nom d\'utilisateur';
        }
        if (isRegisterInfo.password === '') {
            errors.password = 'Veuillez saisir un mot de passe';
        }
        if (isRegisterInfo.confirmPassword === '') {
            errors.confirmPassword = 'Veuillez saisir une confirmation du mot de passe';
        }
        if (isRegisterInfo.password !== isRegisterInfo.confirmPassword) {
            errors.confirmPassword = 'Les mots de passe ne correspondent pas';
        }
        if (isRegisterInfo.gender === '') {
            errors.gender = 'Veuillez saisir votre genre';
        }

        // Mettre à jour l'état des erreurs avec les nouvelles erreurs
        setRegisterError(errors);

        // Vérifier si le formulaire est completé en utilisant la copie locale des erreurs
        const formIsValid = Object.values(errors).every(error => error === '');

        if (formIsValid) {
            if (registerUser === undefined) { console.error('registerUser is undefined'); return; }
            registerUser(isRegisterInfo).then(() => {

                // Faire quelque chose lorsque la promesse est résolue
                // setTimeout() ne marche pas ici
                // Vider les champs d'entrée
                if (isRegistered === true) {
                    if (updateRegisterInfo === undefined) { console.error('updateRegisterInfo is undefined'); return; }
                    updateRegisterInfo({ email: '', username: '', password: '', gender: '', confirmPassword: '' });
                    console.log('Inscription réussie');
                    navigate('/');
                }
            }).catch((error) => {
                // Gérer l'erreur
                console.error('catcheur', error);
            });
        }
    };

    const formField = [
        { name: 'email', label: 'Adresse email', },
        { name: 'username', label: 'Nom d\'utilisateur', },
        { name: 'gender', label: 'Genre', },
        { name: 'password', label: 'Mot de passe', },
        { name: 'confirmPassword', label: 'Confirmation du mot de passe', },
    ];

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
                            {formField.map(step => (
                                step.name === 'gender' ? (
                                    <StyledTextField
                                        key={step.name}
                                        color="primary"
                                        label={step.label}
                                        variant='filled'
                                        name={step.name}
                                        value={isRegisterInfo[step.name as keyof typeof isRegisterInfo]}
                                        onChange={handleChange}
                                        error={registerError[step.name as keyof typeof registerError] !== ''}
                                        helperText={registerError[step.name as keyof typeof registerError]}
                                        select
                                    >
                                        <MenuItem value=""><em>Genre</em></MenuItem>
                                        <MenuItem value="male">Homme</MenuItem>
                                        <MenuItem value="female">Femme</MenuItem>
                                    </StyledTextField>
                                ) : (
                                    <StyledTextField
                                        key={step.name}
                                        color="primary"
                                        label={step.label}
                                        variant="filled"
                                        name={step.name}
                                        value={isRegisterInfo[step.name as keyof typeof isRegisterInfo]}
                                        onChange={handleChange}
                                        error={registerError[step.name as keyof typeof registerError] !== ''}
                                        helperText={registerError[step.name as keyof typeof registerError]}
                                    />
                                )
                            ))}
                        </Stack>
                        {isRegisterError !== null && (
                            <Alert severity="error" sx={{ width: '100%', mt: 2 }}>
                                {isRegisterError}
                            </Alert>
                        )}
                        {isRegistered === true && (
                            <Alert severity="success" sx={{ width: '100%', mt: 2 }}>
                                Inscription réussie !
                            </Alert>
                        )}
                        <StyledButton
                            variant="contained"
                            color="primary"
                            type="submit"
                            disabled={isRegisterLoading}
                            endIcon={isRegisterLoading ? <CircularProgress size="1rem" /> : undefined}
                        >
                            {isRegisterLoading ? 'Enregistrement...' : 'S\'inscrire'}
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