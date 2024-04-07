import React from 'react'
import {
    MuiColorInput,
    MuiColorInputValue,
    MuiColorInputFormat
} from 'mui-color-input'
import customTheme from '../../styles/customTheme';
import { Stack, Typography } from '@mui/material';

export const ColorPicker = ({ element }: { element: string }) => {
    const [value, setValue] = React.useState<MuiColorInputValue>('rgb(255, 255, 255)')

    const handleChange = (newValue: string) => {
        setValue(newValue)
    }

    const format: MuiColorInputFormat = 'rgb'

    return (
        <Stack
            direction={'column'}
            sx={{
                width: '50%',
                boxShadow: customTheme.shadows[1],
            }}
        >
            <Typography
                color={customTheme.palette.slate[200]}
                variant="body1"
                sx={{
                    paddingTop: '0.5rem',
                    textAlign: 'center',
                }}
            >
                {element}
            </Typography>
            <MuiColorInput value={value} onChange={handleChange} format={format}
                sx={{
                    '& .MuiOutlinedInput-notchedOutline': {
                        border: 'none',
                        boxShadow: 'none',
                    },
                    '& .MuiInputBase-input ': {
                        color: customTheme.palette.slate[300],
                        fontSize: '0.875rem',
                    },
                }} />
        </Stack>
    )

}