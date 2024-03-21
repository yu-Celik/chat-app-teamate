import { IconButton, IconButtonProps, Tooltip, Typography, styled } from "@mui/material";
import customTheme from "../../styles/customTheme";

interface IconButtonBurgerProps extends IconButtonProps {
    buttonClicked: boolean;
}


const IconButtonBurgerStyled = styled(IconButton, { shouldForwardProp: (prop) => prop !== 'buttonClicked', })<IconButtonBurgerProps>(({ buttonClicked }) => ({
    marginRight: customTheme.spacing(2),
    color: customTheme.palette.slate[200],
    padding: '1.5rem',
    '&:hover': {
        [customTheme.breakpoints.up('xs')]: {
            backgroundColor: 'transparent',
        },
        [customTheme.breakpoints.up('md')]: {
            color: customTheme.palette.slate[300],
            backgroundColor: customTheme.palette.transparant[300],
        },
    },
    '& .MuiTypography-root': {
        position: 'absolute',
        width: '1.5rem',
        height: '0.10rem',
        backgroundColor: customTheme.palette.slate[200],
        borderRadius: 1,
        transition: 'transform 0.2s ease-out',
        '&:nth-of-type(1)': {
            transform: buttonClicked ? 'translateY(0rem) rotate(-135deg)' : 'translateY(0.375rem) rotate(0)'

        },
        '&:nth-of-type(2)': {
            transform: 'translateY(0)',
            opacity: buttonClicked ? '0%' : '100%'

        },
        '&:nth-of-type(3)': {
            transform: buttonClicked ? 'translateY(0rem) rotate(135deg)' : 'translateY(-0.375rem) rotate(0)'
        }

    }
}));



export default function BurgerButtonMui({ open, ...props }: { open: boolean } & IconButtonProps) {


    return (
        <Tooltip title="Menu">
            <IconButtonBurgerStyled
                buttonClicked={open}
                {...props}
            >
                <Typography />
                <Typography />
                <Typography />
            </IconButtonBurgerStyled>
        </Tooltip>
    )
}
