import { Badge, styled } from '@mui/material';


interface StyledBadgeProps {
    isOnline: boolean;
}

export const StyledBadge = styled(Badge, { shouldForwardProp: (prop) => prop !== 'isOnline' })<StyledBadgeProps>(({ theme, isOnline }) => ({
    '& .MuiBadge-badge': {
        backgroundColor: isOnline ? '#44b700' : 'orange',
        color: isOnline ? '#44b700' : 'orange',
        boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
        zIndex: 1000,
        '&::after': {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            animation: isOnline ? 'ripple 1.2s infinite ease-in-out' : 'none',
            border: '1px solid currentColor',
            content: '""',
        },
    },
    '@keyframes ripple': {
        '0%': {
            transform: 'scale(.8)',
            opacity: 1,
        },
        '100%': {
            transform: 'scale(2.4)',
            opacity: 0,
        },
    },
}));