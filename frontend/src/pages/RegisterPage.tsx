import React, { useEffect, useState } from 'react';
import { Alert, Box, Button, CircularProgress, IconButton, InputAdornment, Link, MenuItem, Stack, TextField, ThemeProvider, Typography, alpha, styled } from "@mui/material";
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import customTheme from '../styles/customTheme'
import LogoTeamateIcon from '../components/Logo/LogoTeamateIcon';
import { RegisterInfo } from '../types/Auth.type/Auth.Props';
import useRegister from '../hooks/Auth/useRegister';
import useAuth from '../contexts/AuthContext/useAuthContext';
import { Visibility, VisibilityOff } from '@mui/icons-material';

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
        margin: customTheme.spacing(4, 15),
        width: '30ch',
        fontWeight: 600,
        '&:hover': {
            backgroundColor: customTheme.palette.purplePV.dark,
        },
        [customTheme.breakpoints.down('md')]: {
            width: '100%',
            margin: customTheme.spacing(4, 0),
            fontSize: customTheme.typography.body2.fontSize,
            lineHeight: customTheme.typography.body2.lineHeight,
            '&:hover': {
                backgroundColor: customTheme.palette.orangePV.dark,
            },
        },
    },
}));



export default function RegisterPage() {
    const { isAuthenticated } = useAuth()
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const { register, updateRegisterInfo, registerUser } = useRegister();
    const [registerError, setRegisterError] = useState<RegisterInfo>({
        email: '',
        username: '',
        gender: '',
        password: '',
        confirmPassword: '',
        general: ''
    });

    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleClickShowConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/');
        }
    }, [isAuthenticated, navigate]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<{ name?: string; value: unknown }>) => {
        const { name, value } = e.target as { name: string, value: string };
        updateRegisterInfo({ ...register.registerInfo, [name]: value });
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
            general: ''
        };

        // Vérifier tous les champs et mettre à jour la copie locale des erreurs
        if (register.registerInfo.email === '') {
            errors.email = 'Veuillez saisir une adresse email';
        }
        if (register.registerInfo.username === '') {
            errors.username = 'Veuillez saisir un nom d\'utilisateur';
        }
        if (register.registerInfo.password === '') {
            errors.password = 'Veuillez saisir un mot de passe';
        }
        if (register.registerInfo.confirmPassword === '') {
            errors.confirmPassword = 'Veuillez saisir une confirmation du mot de passe';
        }
        if (register.registerInfo.password !== register.registerInfo.confirmPassword) {
            errors.confirmPassword = 'Les mots de passe ne correspondent pas';
        }
        if (register.registerInfo.gender === '') {
            errors.gender = 'Veuillez sélectionner votre genre';
        } else if (!['male', 'female'].includes(register.registerInfo.gender)) {
            errors.gender = 'Valeur de genre invalide';
        }

        // Mettre à jour l'état des erreurs avec les nouvelles erreurs
        setRegisterError(errors);

        // Vérifier si le formulaire est completé en utilisant la copie locale des erreurs
        const formIsValid = Object.values(errors).every(error => error === '');

        if (formIsValid) {
            registerUser(register.registerInfo).then(() => {
                updateRegisterInfo({ email: '', username: '', password: '', gender: '', confirmPassword: '' });
            }).catch((error) => {
                let errorMsg = 'Erreur lors de l\'inscription. Veuillez réessayer.';
                if (error.response && error.response.data && error.response.data.error) {
                    errorMsg = error.response.data.error;
                }
                setRegisterError(prevState => ({
                    ...prevState,
                    general: errorMsg,
                }));
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
            <Stack direction={'column'} justifyContent={'center'} alignItems={'center'} padding={{ xs: 0, md: customTheme.spacing(4, 0, 0, 4) }} minHeight={'100dvh'} spacing={{ xs: 2, md: 4 }}>
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
                            {formField.map((step) => {
                                // Champ spécifique pour 'gender'
                                if (step.name === 'gender') {
                                    return (
                                        <StyledTextField
                                            key={step.name}
                                            color="primary"
                                            label={step.label}
                                            variant='filled'
                                            name={step.name}
                                            value={register.registerInfo[step.name as keyof typeof register.registerInfo]}
                                            onChange={handleChange}
                                            error={registerError[step.name as keyof typeof registerError] !== ''}
                                            helperText={registerError[step.name as keyof typeof registerError]}
                                            select
                                        >
                                            <MenuItem value=""><em>None</em></MenuItem>
                                            <MenuItem value="male">Male</MenuItem>
                                            <MenuItem value="female">Female</MenuItem>
                                        </StyledTextField>
                                    );
                                } else {
                                    // Champs de mot de passe avec la possibilité de basculer la visibilité
                                    const isPasswordField = step.name === 'password' || step.name === 'confirmPassword';
                                    return (
                                        <StyledTextField
                                            key={step.name}
                                            type={isPasswordField ? (step.name === 'password' ? (showPassword ? 'text' : 'password') : (showConfirmPassword ? 'text' : 'password')) : 'text'}
                                            label={step.label}
                                            name={step.name}
                                            value={register.registerInfo[step.name as keyof typeof register.registerInfo]}
                                            onChange={handleChange}
                                            error={registerError[step.name as keyof typeof registerError] !== ''}
                                            helperText={registerError[step.name as keyof typeof registerError]}
                                            InputProps={isPasswordField ? {
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            aria-label="toggle password visibility"
                                                            onClick={step.name === 'password' ? handleClickShowPassword : handleClickShowConfirmPassword}
                                                            onMouseDown={handleMouseDownPassword}
                                                            edge="end"
                                                        >
                                                            {(step.name === 'password' ? showPassword : showConfirmPassword) ? <VisibilityOff /> : <Visibility />}
                                                        </IconButton>
                                                    </InputAdornment>
                                                ),
                                            } : {}}
                                            variant="filled"
                                        />
                                    );
                                }
                            })}
                        </Stack>
                        {register.registerError !== null && (
                            <Alert severity="error" sx={{ width: '100%', mt: 2 }}>
                                {register.registerError}
                            </Alert>
                        )}
                        {registerError.general && (
                            <Alert severity="error" sx={{ width: '100%', mt: 2 }}>
                                {registerError.general}
                            </Alert>
                        )
                        }
                        {register.isRegistered === true && (
                            <Alert severity="success" sx={{ width: '100%', mt: 2 }}>
                                Inscription réussie !
                            </Alert>
                        )}
                        <StyledButton
                            variant="contained"
                            color="primary"
                            type="submit"
                            disabled={register.isRegisterLoading}
                            endIcon={register.isRegisterLoading ? <CircularProgress size="1rem" /> : undefined}
                        >
                            {register.isRegisterLoading ? 'Enregistrement...' : 'S\'inscrire'}
                        </StyledButton>
                        <StyledTypography gutterBottom variant={'body2'}>
                            Vous avez déjà un compte ? <Link color={'primary'} fontWeight={600} component={RouterLink} underline={'hover'} to={'/login'}>Connectez-vous</Link>
                        </StyledTypography>
                        <StyledTypography variant={'subtitle2'}>
                            En cliquant sur "S'inscrire", vous acceptez les <Link color={'primary'} fontWeight={600} component={RouterLink} underline={'hover'} to={'/'}>Conditions d'utilisation</Link> et la <Link color={'primary'} fontWeight={600} component={RouterLink} underline={'hover'} to={'/'}>Politique de confidentialité</Link> de Teamate.
                        </StyledTypography>
                    </Box>
                </Stack>
            </Stack>
        </ThemeProvider>
    );
}