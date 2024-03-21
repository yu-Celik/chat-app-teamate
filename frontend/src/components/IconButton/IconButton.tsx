import { styled, IconButton, type IconButtonProps, Tooltip } from '@mui/material';
import customTheme from '../../styles/customTheme';

interface StyledIconButtonProps extends IconButtonProps {
    menustyle?: 'true' | 'false'
    barStyle?: 'true' | 'false'
    burger?: 'true' | 'false'
    title: string
}

const IconButtonWithProps = ({ title, ...props }: StyledIconButtonProps): JSX.Element => (
    <Tooltip title={title}>
        <IconButton {...props} />
    </Tooltip>
);

export const StyledIconButton = styled(IconButtonWithProps)<StyledIconButtonProps>(({ menustyle, barStyle, burger }) => ({
    color: menustyle === 'true' ? customTheme.palette.slate[200] : customTheme.palette.slate[200],
    borderRadius: barStyle === 'true' ? '0.25rem' : '',
    padding: burger === 'true' ? '1.5rem' : '',
    '&:hover': {
        [customTheme.breakpoints.up('xs')]: {
            backgroundColor: 'transparent',
        },
        [customTheme.breakpoints.up('md')]: {
            color: customTheme.palette.slate[300],
            backgroundColor: customTheme.palette.transparant[300],
        },
    },
}));