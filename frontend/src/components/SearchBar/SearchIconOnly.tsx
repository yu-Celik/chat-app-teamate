import { MouseEventHandler } from "react";
import { StyledIconButton } from "../IconButton/IconButton";
import { Search as SearchIcon } from '@mui/icons-material';
import customTheme from '../../styles/customTheme';

export function SearchIconOnly({ onClick, ...props }: { onClick: MouseEventHandler<HTMLElement> }): JSX.Element {
    return (
        <StyledIconButton
            title="Rechercher"
            {...props}
            size="large"
            edge="start"
            role="button"
            aria-label="Rechercher"
            aria-haspopup="true"
            onClick={onClick}
            sx={{
                marginLeft: customTheme.spacing(0),
            }}
        >
            <SearchIcon titleAccess="Rechercher" />
        </StyledIconButton>

    );
}