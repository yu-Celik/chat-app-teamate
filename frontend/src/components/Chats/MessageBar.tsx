import { Box, Stack, TextField, alpha, styled, useMediaQuery } from "@mui/material";
import Picker from '@emoji-mart/react'
import customTheme from "../../styles/customTheme";
import { AttachFile, Mood, Mic, Send } from '@mui/icons-material';
import { StyledIconButton } from "../IconButton/IconButton";
import { useState } from "react";

const StyledTextField = styled(TextField)({
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
})

export default function ChatBar({ username }: { username: string }) {
    const [icon, setIcon] = useState(<Mic />);
    const [openPicker, setOpenPicker] = useState(false);

    const isSmallScreen = useMediaQuery(customTheme.breakpoints.down('sm'));

    return (
        <Stack direction={'column'} padding={{ xs: customTheme.spacing(0, 1), md: customTheme.spacing(0) }}>
            {openPicker &&
                <Box flexGrow={1}>
                    <Picker emojiSize={32} set={'apple'} perLine={isSmallScreen ? 6 : 10} locale={'fr'} onClickOutside={() => { setOpenPicker(!openPicker); }} />
                </Box>
            }
            <StyledTextField
                variant="filled"
                onChange={(e) => {
                    if (e.target.value) {
                        setIcon(<Send />);
                    } else {
                        setIcon(<Mic />);
                    }
                }}
                color="primary"
                placeholder={`Ecrivez un message à ${username}`}
                hiddenLabel
                multiline
                maxRows={3}
                InputProps={{
                    startAdornment: (
                        <StyledIconButton title="Emoji" onClick={() => { setTimeout(() => { setOpenPicker(!openPicker); }, 0); }}>
                            <Mood />
                        </StyledIconButton>
                    ),
                    endAdornment: (
                        <Stack direction={"row"}>
                            <StyledIconButton title="Fichier">
                                <AttachFile />
                            </StyledIconButton>
                            <StyledIconButton title="Envoyer">
                                {icon}
                            </StyledIconButton>
                        </Stack>
                    )
                }}
            />

        </Stack >
    )
}