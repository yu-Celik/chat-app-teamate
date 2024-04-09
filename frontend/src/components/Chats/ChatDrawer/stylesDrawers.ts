import { styled } from '@mui/material/styles';


import {  Box } from '@mui/material';
import customTheme from '../../../styles/customTheme';

export const DrawerHeader = styled(Box)(() => ({
    display: 'flex',
    alignItems: 'center',
    ...customTheme.mixins.toolbar,
    justifyContent: 'flex-start',
}));

export const DrawerFooter = styled(Box)(() => ({

    '& .MuiListItem-root': {
        color: customTheme.palette.slate[200],
    },
    '& .MuiSvgIcon-root': {
        color: customTheme.palette.slate[200],
    },
    '& .MuiTypography-root': {
        padding: customTheme.spacing(0, 2),
    },
    '& .MuiListItemIcon-root': {
        minWidth: 'fit-content',
    },
    [customTheme.breakpoints.down('md')]: {
        '& .MuiList-root': {
            display: 'flex',
            flexGrow: 1,
            padding: customTheme.spacing(0),
        },
        '& .MuiListItem-root': {
            flexDirection: 'column',
            flexGrow: 1,
        },
        '& .MuiButtonBase-root': {
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            flexGrow: 1,
        },
    },
    [customTheme.breakpoints.down(400)]: {
        '& .MuiButtonBase-root': {
            padding: customTheme.spacing(1, 0),
        },
    },
    [customTheme.breakpoints.down(330)]: {
        '& .MuiListItem-root': {
            flexDirection: 'row',
            flexGrow: 0,
        },
        '& .MuiButtonBase-root': {
            margin: 'auto',
            flexDirection: 'row',
        },
        '& .MuiListItemText-root': {
            margin: 'auto',
            width: 'fit-content',
        },
        '& .MuiTypography-root': {
            padding: customTheme.spacing(0),
            width: 'fit-content',
            textAlign: 'center',
        },
        '& .MuiListItemIcon-root': {
            padding: customTheme.spacing(0, 1),
        },
    },

}));












