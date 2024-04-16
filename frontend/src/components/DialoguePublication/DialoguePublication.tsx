import * as React from 'react';
import { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Stack, TextField, alpha, styled } from '@mui/material';
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
import { StyledIconButton } from '../IconButton/IconButton.tsx';
import { TypewriterEffectSmooth } from '../ui/typewriter-effect.tsx';
import customTheme from './../../styles/customTheme.ts';

const StyledTextField = styled(TextField)(() => ({
    '& .MuiInputBase-root': {
        color: customTheme.palette.slate[200],
        '&::before': {
            borderBottom: `1px solid ${customTheme.palette.slate[200]}`,
        },
        '&::after': {
            borderBottom: `1px solid ${customTheme.palette.orangePV.dark}`,
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

const words = [
    {
        text: 'Créer',
    },
    {
        text: 'une',
    },
    {
        text: 'nouvelle',
    },
    {
        text: 'Publication',
        className: 'text-orangePV-900 dark:text-orangePV-900',
    },
];




interface DialogBoxProps {
    open: boolean;
    handleClose: () => void;
}

const DialogBox = React.forwardRef<HTMLDivElement, DialogBoxProps>(({ open, handleClose }, ref) => {
    const [selectedFile, setSelectedFile] = useState<string | null>(null);

    const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            // setDroppedFiles(Array.from(event.target.files));
            setSelectedFile(URL.createObjectURL(event.target.files[0]));
        }
    };

    const handleDragOver = (event: React.DragEvent) => {
        event.preventDefault();
    };

    const handleDrop = (event: React.DragEvent) => {
        event.preventDefault();

        if (event.dataTransfer.items) {
            const files: File[] = [];
            // Utilisez DataTransferItemList pour accéder aux fichiers
            for (let i = 0; i < event.dataTransfer.items.length; i++) {
                // Si les éléments déposés sont des fichiers
                if (event.dataTransfer.items[i].kind === 'file') {
                    const file = event.dataTransfer.items[i].getAsFile();
                    if (file !== null) {
                        files.push(file);
                    }
                }
            }
            // setDroppedFiles(files);
        }
    };
    return (
        <Dialog open={open} onClose={handleClose} ref={ref}
                sx={{
                    "& .MuiDialog-paper": {
                        backgroundColor: customTheme.palette.bluePV.dark,
                        color: customTheme.palette.slate[200],
                    },
                }}
            >
                <DialogTitle
                    sx={{
                        borderBottom: `1px solid ${customTheme.palette.orangePV.dark}`,
                    }}
                    textAlign={'center'}
                >
                    <TypewriterEffectSmooth speed={{ delay: 0.2, duration: 1 }} words={words} />
                </DialogTitle>

                <DialogContent
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                    sx={{
                        display: 'flex',
                        gap: '1rem',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '100%',
                        backgroundColor: customTheme.palette.bluePV.dark,
                    }}
                >

                    <input
                        accept="image/*,video/*"
                        type="file"
                        multiple
                        onChange={handleFileSelect}
                        style={{ display: 'none' }}
                        id="file-upload"
                    />

                    <label htmlFor="file-upload">
                        {selectedFile ? (
                            <img src={selectedFile} alt="Selected" style={{ width: '40rem', height: '10rem', objectFit: 'cover', marginTop: "1rem", borderRadius: "10px" }} />
                        ) : (
                            <Stack>
                                <StyledIconButton title={"Ajouter"} color="primary" component="span">
                                    <AddPhotoAlternateOutlinedIcon sx={{
                                        textAlign: 'center',
                                        fontSize: '5rem',
                                        color: customTheme.palette.slate[200],
                                    }} />
                                </StyledIconButton>
                                <DialogContentText
                                    sx={{
                                        color: customTheme.palette.slate[200],
                                    }}>
                                    Faites glisser vos photos et les vidéos ici
                                </DialogContentText>
                            </Stack>
                        )}
                    </label>

                    <StyledTextField
                        autoFocus
                        margin="dense"
                        id="post"
                        label="Écrire..."
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button
                        sx={{
                            fontSize: '1rem',
                            color: customTheme.palette.slate[200],
                        }}
                        title="Annuler"
                        onClick={() => {
                            handleClose();
                            setSelectedFile(null);
                        }}>Annuler
                    </Button>
                    <Button
                        sx={{
                            fontSize: '1rem',
                            color: customTheme.palette.orangePV.dark,

                        }}
                        title="Publier"
                        onClick={() => {
                            handleClose();
                            setSelectedFile(null);
                        }}>Publier
                    </Button>
                </DialogActions>
            </Dialog >
    );
});


DialogBox.displayName = 'DialogBox';

export default DialogBox;