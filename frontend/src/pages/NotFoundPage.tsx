import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

function NotFoundPage() {
    return (
        <Container>
            <Typography variant="h1">404 Page Not Found</Typography>
            <Typography>We're sorry, the page you requested could not be found.</Typography>
            <Button variant="contained" color="primary">Go Home</Button>
        </Container>
    );
}

export default NotFoundPage;
