import { TextField, alpha, styled } from "@mui/material";
import customTheme from "../../../styles/customTheme";

export const StyledTextField = styled(TextField)({
    '& .MuiInputBase-root': {
        color: customTheme.palette.slate[200],
        padding: customTheme.spacing(0.5, 1),
        fontSize: customTheme.typography.body2.fontSize,
        [customTheme.breakpoints.up('md')]: {
            fontSize: customTheme.typography.body1.fontSize,
        },
        '&::before': {
            borderBottomColor: customTheme.palette.slate[200],
        },
        '& .MuiInputBase-inputMultiline': {
            padding: customTheme.spacing(1.5),
            height: customTheme.spacing(3),
        }
    },
    position: 'relative',
    '& .MuiFormHelperText-root': {
        position: 'absolute',
        bottom: '100%',
        color: customTheme.palette.error.main,
        fontSize: '0.75rem',
        fontWeight: 600,
    },

    '& .MuiFilledInput-root': {
        backgroundColor: alpha(customTheme.palette.slate[200], 0.1),
        '&:hover': {
            backgroundColor: alpha(customTheme.palette.slate[800], 0.2),
        },
        '&::after': {
            borderColor: customTheme.palette.orangePV.dark,
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
});

