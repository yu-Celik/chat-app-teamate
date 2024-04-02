import { FC, MouseEvent } from 'react';
import { Menu, MenuItem, MenuProps, PopoverPosition, alpha, styled } from '@mui/material';
import customTheme from '../../../styles/customTheme';

interface ContextMenuProps {
    onEdit?: (messageId: string, newText: string) => void;
    onDelete?: (chatId: string) => void;
    onReply?: () => void;
    onCopy?: (message: string) => void;
    message: string;
    messageId?: string;
    menuPosition: { top: number, left: number } | null;
    handleCloseMenu: () => void;
    handleContextMenu: (event: MouseEvent<HTMLDivElement>) => void;
    open: boolean;
    anchorReference: string;
    anchorPosition: { top: number, left: number } | null;
    chatId?: string;
    senderId?: string;
    currentUserId?: string | null;
}

export const StyledMenu = styled((props: MenuProps) => (
    <Menu
        elevation={0}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
        {...props}
    />
))(() => ({
    '& .MuiPaper-root': {
        borderRadius: 6,
        marginTop: customTheme.spacing(1),
        minWidth: 180,
        color: customTheme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : customTheme.palette.slate[300],
        boxShadow:
            'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
        backgroundColor: customTheme.palette.bluePV.dark,
        '& .MuiMenu-list': {
            padding: '4px 0',
            '& .MuiTypography-root': {
                color: customTheme.palette.slate[200],
            }
        },
        '& .MuiMenuItem-root': {
            '& .MuiSvgIcon-root': {
                fontSize: 18,
                color: customTheme.palette.text.secondary,
                marginRight: customTheme.spacing(1.5),
            },
            '&:active': {
                backgroundColor: alpha(
                    customTheme.palette.slate[300],
                    customTheme.palette.action.selectedOpacity,
                ),
            },
        },
    },
}));

const ContextMenu: FC<ContextMenuProps> = ({ onEdit, onDelete, onReply, onCopy, message, senderId, currentUserId, menuPosition, handleCloseMenu, handleContextMenu, chatId, messageId }) => {

    return (
        <div onContextMenu={handleContextMenu}>
            <StyledMenu
                open={menuPosition !== null}
                onClose={handleCloseMenu}
                anchorReference="anchorPosition"
                anchorPosition={menuPosition as PopoverPosition}
                sx={{
                    '& .MuiMenu-paper': {
                        backgroundColor: customTheme.palette.bluePV.dark,
                        color: customTheme.palette.slate[300],
                    },
                    '& .MuiMenuItem-root': {
                        '&:hover': {
                            backgroundColor: customTheme.palette.transparant[100],
                        },
                    },
                }}
            >
                {onEdit && senderId === currentUserId && (
                    <MenuItem onClick={(event) => {
                        event.stopPropagation();
                        onEdit(messageId as string, message);
                        handleCloseMenu();
                    }}>Modifier</MenuItem>
                )}
                {onDelete && senderId === currentUserId && (
                    <MenuItem onClick={(event) => {
                        event.stopPropagation();
                        onDelete(chatId as string);
                        handleCloseMenu();
                    }}>Supprimer</MenuItem>
                )}
                {onReply && <MenuItem onClick={() => { onReply(); handleCloseMenu(); }}>Répondre</MenuItem>}
                {onCopy && <MenuItem onClick={() => { onCopy(message as string); handleCloseMenu(); }}>Copier</MenuItem>}
            </StyledMenu>
        </div>
    );
};

export default ContextMenu;