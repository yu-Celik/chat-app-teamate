import { Dialog, InputBase, InputBaseComponentProps, ModalProps, alpha, styled } from "@mui/material";
import { Search as SearchIcon } from '@mui/icons-material';
import customTheme from '../../styles/customTheme';

const DialogSearch = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: '.5rem',
    border: '1px solid #cbd5e1',
    backgroundColor: alpha(theme.palette.grey[800], 0.15),
    backdropFilter: 'blur(10rem)',
    '&:hover': {
        backgroundColor: alpha(theme.palette.grey[900], 0.25),
    },
    width: '100%', 
}));
const DialogSearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const DialogStyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
    },
}));

interface SearchBarInDialogProps {
    placeholder?: string
    inputProps?: InputBaseComponentProps
    onClose?: ModalProps['onClose']
    open: ModalProps['open']
}

export function SearchBarInDialog({ placeholder, inputProps, onClose, open }: SearchBarInDialogProps): JSX.Element {
    return (
        <>
            <Dialog fullWidth open={open} onClose={onClose} sx={{
                '& .MuiDialog-paper': {
                    backgroundColor: 'transparent',
                    color: alpha(customTheme.palette.common.white, 0.95),
                    borderRadius: '.5rem',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                },
            }}>
                <DialogSearch>
                    <DialogSearchIconWrapper>
                        <SearchIcon />
                    </DialogSearchIconWrapper>
                    <DialogStyledInputBase
                        placeholder={placeholder}
                        inputProps={inputProps}
                        multiline
                        maxRows={5}
                    />
                </DialogSearch>
            </Dialog>
        </>

    );
}