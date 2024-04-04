import { InputBase, InputBaseComponentProps, alpha, styled } from "@mui/material";
import { Search as SearchIcon } from '@mui/icons-material';
import { MouseEventHandler } from "react";

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    color: '#cbd5e1',
    border: '1px solid #cbd5e1',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: 'transparent',
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.15),
    },
    marginRight: theme.spacing(2),
    marginLeft: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
    },
}));

interface SearchBarProps {
    placeholder?: string
    inputProps?: InputBaseComponentProps
    onClick?: MouseEventHandler<HTMLElement> | undefined
}

export function SearchBar({ placeholder, inputProps, onClick }: SearchBarProps): JSX.Element {
    return (
        <>
            <Search>
                <SearchIconWrapper>
                    <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                    placeholder={placeholder}
                    inputProps={inputProps}
                    onClick={onClick}
                />
            </Search>
        </>

    );
}