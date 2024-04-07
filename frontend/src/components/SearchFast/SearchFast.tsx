import { Button, Checkbox, FormControl, FormControlLabel, FormLabel, Stack, styled } from "@mui/material"
import customTheme from "./../../styles/customTheme.ts";

const StyledButton = styled(Button)(() => ({
    '&.MuiButton-root': {
        color: customTheme.palette.slate[200],
        // margin: customTheme.spacing(4, 0),
        width: '30ch',
        fontWeight: 600,
        backgroundColor: customTheme.palette.orangePV.dark,
        '&:hover': {
            backgroundColor: customTheme.palette.orangePV.light,
        },
        [customTheme.breakpoints.down('md')]: {
            width: '100%',
            fontSize: customTheme.typography.body2.fontSize,
            lineHeight: customTheme.typography.body2.lineHeight,
        },
    },
}));

export default function SearchFast() {
  return (
    <Stack marginX={'auto'} marginTop={4} className="md:flex md:justify-center md:items-center w-4/5">
    <FormControl sx={{
        color: customTheme.palette.slate[300]
    }}>
        <FormLabel
            sx={{
                fontSize: "1.6rem",
                color: customTheme.palette.slate[300],
                '&.Mui-focused': {
                    color: customTheme.palette.slate[300],
                },
            }}
        >
            Recherche de salon rapide :
        </FormLabel>
        <FormControlLabel  value="Mes jeux favories" control={
            <Checkbox
                sx={{
                    color: customTheme.palette.orangePV.main,
                    '&.Mui-checked': {
                        color: customTheme.palette.orangePV.dark,
                    },
                }}
            />} label="Mes jeux favories" />
        <FormControlLabel  value="Ma Langue" control={
            <Checkbox
                sx={{
                    color: customTheme.palette.orangePV.main,
                    '&.Mui-checked': {
                        color: customTheme.palette.orangePV.dark,
                    },
                }}
            />} label="Ma langue" />
        <FormControlLabel  value="Micro" control={
            <Checkbox
                sx={{
                    color: customTheme.palette.orangePV.main,
                    '&.Mui-checked': {
                        color: customTheme.palette.orangePV.dark,
                    },
                }}
            />} label="Micro" />
    </FormControl>
    <StyledButton
        variant="contained"
        color="primary"
        type="submit">
        Rechercher
    </StyledButton>
</Stack>
  )
}