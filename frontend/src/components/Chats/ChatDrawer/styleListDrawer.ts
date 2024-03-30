import customTheme from '../../../styles/customTheme';


export const styleListDrawer = {
    height: '100%',
    overflowY: 'auto',
    overflowX: 'hidden',
    scrollBehavior: 'smooth',
    WebkitOverflowScrolling: 'touch',
    '&::-webkit-scrollbar': {
        width: '0.25rem',
        height: '0.25rem',
    },
    '&::-webkit-scrollbar-thumb': {
        backgroundColor: customTheme.palette.slate[500],
        borderRadius: '10px',
    },
    '&::-webkit-scrollbar-track': {
        backgroundColor: 'transparent',
    },
    '&::-webkit-scrollbar-thumb:hover': {
        backgroundColor: customTheme.palette.slate[600],
    },
};

export const styleListDrawerOrder = {
    height: '80%',
    overflowY: 'auto',
    overflowX: 'hidden',
    scrollBehavior: 'smooth',
    WebkitOverflowScrolling: 'touch',
    '::WebkitScrollbar': {
        width: '0.25rem',
        height: '0.25rem',
    },
    '::WebkitScrollbarThumb': {
        backgroundColor: customTheme.palette.slate[500],
        borderRadius: '10px',
    },
    '::WebkitScrollbarTrack': {
        backgroundColor: 'transparent',
    },
    '::WebkitScrollbarThumb:hover': {
        backgroundColor: customTheme.palette.slate[600],
    },
};


