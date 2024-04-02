import React, { useEffect, useState } from 'react';
import { Alert, Box, Button, CircularProgress, Link, Stack, TextField, ThemeProvider, Typography, alpha, styled } from "@mui/material";
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import customTheme from '../styles/customTheme'
import LogoTeamateIcon from '../components/Logo/LogoTeamateIcon';
import useLogin from '../hooks/Auth/useLogin';

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
  const { login, updateLoginInfo, loginUser } = useLogin();
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  useEffect(() => {
    if (login.isLogged === true) {
      navigate('/');
    }
  }, [login.isLogged, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<{ name?: string; value: unknown }>) => {
    const { name, value } = e.target as { name: string, value: string };
    updateLoginInfo({ ...login.loginInfo, [name]: value });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Préparer un objet pour les erreurs potentielles
    const errors = {
      email: '',
      username: '',
      gender: '',
      password: '',
      confirmPassword: '',
    };

    // Vérifier tous les champs
    if (login.loginInfo.email === '') {
      errors.email = 'Veuillez saisir une adresse email';
    }

    if (login.loginInfo.password === '') {
      errors.password = 'Veuillez saisir un mot de passe';
    }

    // Mettre à jour l'état des erreurs avec les nouvelles erreurs
    setLoginError(errors);

    // Vérifier si le formulaire est valide
    const formIsValid = Object.values(errors).every(error => error === '');

    if (formIsValid) {
      if (loginUser === undefined) { console.error('loginUser is undefined'); return; }
      loginUser().then(() => {

        // Vider les champs d'entrée
        if (login.isLogged === true) {
          updateLoginInfo({ email: '', password: '' });
          console.log('Inscription réussie');
          navigate('/');
        }
      }).catch((error) => {
        // Gérer l'erreur
        console.error('catcheur', error);
      });
    }
  }



  const formField = [
    { name: 'email', label: 'Adresse email', },
    { name: 'password', label: 'Mot de passe', },
  ];

  return (
    <ThemeProvider theme={customTheme}>
      <Stack direction={'column'} justifyContent={'center'} alignItems={'center'} padding={{ xs: 0, md: customTheme.spacing(4, 0, 0, 4) }} minHeight={'100vh'} spacing={{ xs: 2, md: 4 }}>
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
          <StyledTypography gutterBottom variant="h1">Se connecter</StyledTypography>
          <Box maxWidth={{ xs: '100%', md: '470px' }} width={'100%'} component={'form'} onSubmit={handleSubmit}>
            <Stack spacing={2}>
              {formField.map(step => (

                <StyledTextField
                  key={step.name}
                  color="primary"
                  label={step.label}
                  variant="filled"
                  name={step.name}
                  value={login.loginInfo[step.name as keyof typeof login.loginInfo]}
                  onChange={handleChange}
                  error={loginError[step.name as keyof typeof loginError] !== ''}
                  helperText={loginError[step.name as keyof typeof loginError]}
                />
              ))}
            </Stack>
            {login.loginError !== null && (
              <Alert severity="error" sx={{ width: '100%', mt: 2 }}>
                {login.loginError}
              </Alert>
            )}
            {login.isLogged === true && (
              <Alert severity="success" sx={{ width: '100%', mt: 2 }}>
                Inscription réussie !
              </Alert>
            )}
            <StyledButton
              variant="contained"
              color="primary"
              type="submit"
              disabled={login.isLoggedLoading}
              endIcon={login.isLoggedLoading ? <CircularProgress size="1rem" /> : undefined}
            >
              {login.isLoggedLoading ? 'Connexion...' : 'Se connecter'}
            </StyledButton>
            <StyledTypography gutterBottom variant={'body2'}>
              Vous n'avez pas de compte ? <Link fontWeight={600} component={RouterLink} color={'primary'} underline={'hover'} to={'/Register'}>Inscrivez-vous</Link>
            </StyledTypography>
          </Box>
        </Stack>
      </Stack>
    </ThemeProvider>
  );
}