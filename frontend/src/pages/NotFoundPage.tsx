import Typography from '@mui/material/Typography';
import customTheme from '../styles/customTheme'
import { Button, Paper, ThemeProvider, alpha, styled } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const StyledButton = styled(Button)(() => ({
    '&.MuiButton-root': {
        color: customTheme.palette.slate[200],
        margin: customTheme.spacing(2, 0),
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
function NotFoundPage() {
    const navigate = useNavigate()
    return (
        <ThemeProvider theme={customTheme}>
            <Paper sx={{
                '&.MuiPaper-root': {
                    backgroundColor: alpha(customTheme.palette.slate[200], 0.1),
                    padding: customTheme.spacing(2),
                    width: '50%',
                    margin: 'auto'
                }
            }}>
                <Typography color={customTheme.palette.slate[200]} fontSize={'48px'} variant="h1">404 Page Not Found</Typography>
                <Typography color={customTheme.palette.slate[200]}>Nous sommes désolés, la page que vous avez demandée est introuvable.</Typography>
                <StyledButton
                    variant="contained"
                    color="primary"
                    onClick={() => navigate('/')}
                >
                    Accueil
                </StyledButton>
            </Paper>
        </ThemeProvider >
    );
}

export default NotFoundPage;
