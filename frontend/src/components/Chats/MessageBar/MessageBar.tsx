import { Box, FormControl, Stack, TextFieldVariants, Typography, alpha, useMediaQuery } from "@mui/material";
import Picker from '@emoji-mart/react'
import data from '@emoji-mart/data'
import customTheme from "../../../styles/customTheme";
import { Mood, EditOutlined } from '@mui/icons-material';
import { StyledIconButton } from "../../IconButton/IconButton";
import { ChangeEventHandler, FormEvent, FormEventHandler, MouseEventHandler, RefObject, useState } from "react";
import { StyledTextField } from "./styleMessageBar";
import { motion } from 'framer-motion';
import { generateIconAnimation } from "../../Button/generateIconAnimation";

interface ChatBarProps {
    icon: { icon: React.ReactNode, key: string, title: string };
    secondaryIcon: { icon: React.ReactNode, key: string, title: string };
    messageToEdit: string | null;
    messageIsEditing: boolean;
    handleCloseEdit: MouseEventHandler<HTMLButtonElement>;
    handleTextChange: ChangeEventHandler<HTMLInputElement>;
    handleSendMessage: FormEventHandler<HTMLFormElement>;
    idTextField: string;
    variantTextField: TextFieldVariants;
    ariaLabelTextField: string;
    ariaDescribedbyTextField: string;
    ariaInvalidTextField: boolean;
    chatInputRef: RefObject<HTMLInputElement | HTMLTextAreaElement>
    messageText: string;
    nameTextField: string;
    typeTextField: string;
    colorTextField: "error" | "primary" | "secondary" | "info" | "success" | "warning" | undefined;
    placeholderTextField: string;
    hiddenLabelTextField: boolean;
    multilineTextField: boolean;
    helperText: string | null;
    errorTextField: boolean;

}

export default function ChatBar({ icon, secondaryIcon, messageToEdit, messageIsEditing, handleCloseEdit, handleTextChange, handleSendMessage, idTextField, variantTextField, ariaLabelTextField, ariaDescribedbyTextField, ariaInvalidTextField, chatInputRef, messageText, nameTextField, typeTextField, colorTextField, placeholderTextField, hiddenLabelTextField, multilineTextField, helperText, errorTextField }: ChatBarProps) {
    const [openPicker, setOpenPicker] = useState(false);
    const isSmallScreen = useMediaQuery(customTheme.breakpoints.down('sm'));

    const spinTransition = {
        loop: Infinity,
        duration: 1,
        ease: "easeInOut"
    };

    return (
        <>
            <Stack direction={'column'} padding={{ xs: customTheme.spacing(0, 1), md: customTheme.spacing(0) }}>
                {openPicker &&
                    <Box zIndex={1000} flexGrow={1}>
                        <Picker data={data} emojiButtonColors={[
                            'rgba(155,223,88,.7)',
                            'rgba(149,211,254,.7)',
                            'rgba(247,233,34,.7)',
                            'rgba(238,166,252,.7)',
                            'rgba(255,213,143,.7)',
                            'rgba(211,209,255,.7)',]} onEmojiSelect={handleTextChange} emojiSize={24} perLine={isSmallScreen ? 6 : 10} onClickOutside={() => { setOpenPicker(!openPicker); }} />
                    </Box>
                }
                <FormControl component="form" onSubmit={handleSendMessage}>
                    <Stack direction={'row'} alignItems={'center'} sx={{
                        display: messageIsEditing ? 'flex' : 'none',
                        color: customTheme.palette.slate[200],
                        backgroundColor: alpha(customTheme.palette.slate[200], 0.1),
                        padding: customTheme.spacing(1, 1, 1, 6),
                        '&:hover': {
                            backgroundColor: alpha(customTheme.palette.slate[800], 0.2),
                        },
                    }}>
                        <Stack flexGrow={1} direction={'row'} alignItems={'center'} p={0.5} sx={{
                            backgroundColor: alpha(customTheme.palette.orangePV.dark, 0.2),
                            borderRadius: '0.5rem',
                        }}>
                            <Stack direction={'row'} alignItems={'center'} padding={1} marginRight={1}>
                                <EditOutlined />
                            </Stack>
                            <Stack direction={'column'}>
                                <Typography sx={{
                                    fontSize: customTheme.typography.subtitle2
                                }}>
                                    Modifiez votre message
                                </Typography>
                                <Typography sx={{
                                    fontSize: customTheme.typography.caption
                                }}>
                                    {messageToEdit}
                                </Typography>
                            </Stack>
                        </Stack>
                    </Stack>
                    <StyledTextField
                        id={idTextField}
                        variant={variantTextField}
                        aria-label={ariaLabelTextField}
                        aria-describedby={ariaDescribedbyTextField}
                        aria-invalid={ariaInvalidTextField}
                        inputRef={chatInputRef}
                        value={messageText as string}
                        name={nameTextField}
                        onChange={handleTextChange}
                        type={typeTextField}
                        color={colorTextField}
                        placeholder={placeholderTextField}
                        hiddenLabel={hiddenLabelTextField}
                        multiline={multilineTextField}
                        maxRows={3}
                        helperText={helperText}
                        error={errorTextField}
                        InputProps={{

                            startAdornment: (
                                <motion.div
                                    whileHover={{ rotate: 360 }}
                                    transition={spinTransition}
                                >
                                    <StyledIconButton title="Emoji" onClick={() => {
                                        setTimeout(() => {
                                            setOpenPicker(!openPicker);
                                        }, 0);
                                    }}>
                                        <Mood />
                                    </StyledIconButton>
                                </motion.div>
                            ),
                            endAdornment: (
                                <Stack direction={"row"}>
                                    <StyledIconButton title={secondaryIcon.title} onClick={handleCloseEdit}>
                                        {generateIconAnimation(secondaryIcon.key, secondaryIcon.icon)}
                                    </StyledIconButton>
                                    <StyledIconButton type="submit" title={icon.title}>
                                        {generateIconAnimation(icon.key, icon.icon)}
                                    </StyledIconButton>
                                </Stack>
                            )
                        }}
                        onKeyDown={(ev) => {
                            if (ev.key === 'Enter') {
                                handleSendMessage(ev as unknown as FormEvent<HTMLFormElement>);
                                ev.preventDefault();
                            }
                        }}
                        autoComplete="off"

                    />
                </FormControl >
            </Stack >
        </>
    )
}