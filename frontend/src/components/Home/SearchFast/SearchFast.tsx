import { Button, Checkbox, FormControl, FormControlLabel, FormLabel, Stack, Typography, alpha, styled } from "@mui/material"
import customTheme from "../../../styles/customTheme.ts";

const StyledTypography = styled(Typography)(() => ({
    color: customTheme.palette.slate[200],
  
    '&.MuiTypography-root.MuiTypography-h1': {
      fontWeight: 600,
      fontSize: customTheme.typography.h4.fontSize,
      lineHeight: customTheme.typography.h4.lineHeight,
  
      [customTheme.breakpoints.up('md')]: {
        fontSize: customTheme.typography.h3.fontSize,
        lineHeight: customTheme.typography.h3.lineHeight
      },
  
    },
  
    '&.MuiTypography-root.MuiTypography-body2': {
      fontSize: customTheme.typography.subtitle2.fontSize,
      lineHeight: customTheme.typography.subtitle2.lineHeight,
      [customTheme.breakpoints.down('lg')]: {
      },
      [customTheme.breakpoints.down('md')]: {
        fontSize: customTheme.typography.subtitle2.fontSize,
        lineHeight: customTheme.typography.subtitle2.lineHeight,
      },
    },
    '&.MuiTypography-root.MuiTypography-subtitle2': {
      fontSize: customTheme.typography.caption.fontSize,
      lineHeight: customTheme.typography.caption.lineHeight,
      [customTheme.breakpoints.down('lg')]: {
      },
      [customTheme.breakpoints.down('md')]: {
        margin: customTheme.spacing(2, 0),
        fontSize: customTheme.typography.caption.fontSize,
        lineHeight: customTheme.typography.caption.lineHeight,
      },
    },
  }));

const StyledButton = styled(Button)(() => ({
    '&.MuiButton-root': {
        color: customTheme.palette.slate[200],
        // margin: customTheme.spacing(4, 0),
        maxWidth: '8rem',
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
        [customTheme.breakpoints.down('sm')]: {
            width: '100%',
            maxWidth: '100%',
        },
    },
}));

export default function SearchFast() {
    return (
        <Stack
            className="mx-auto w-4/5 max-w-80 md:mx-0 h-[23rem]  "
            sx={{
                backgroundColor: alpha(customTheme.palette.slate[200], 0.1),
                padding: customTheme.spacing(4),
                borderRadius: customTheme.spacing(2),
                width: 'fit-content',
            }}
        >
            <FormControl
                sx={{
                    color: customTheme.palette.slate[200]
                }}
            >
                <FormLabel
                    sx={{
                        fontSize: "1.6rem",
                        color: customTheme.palette.slate[200],
                        '&.Mui-focused': {
                            color: customTheme.palette.slate[200],
                        },
                    }}
                >
                    <StyledTypography variant="h4" >
                    Recherche de salon rapide :
                    </StyledTypography>

                </FormLabel>
                <FormControlLabel
                    value="Mes jeux favories"
                    control={
                        <Checkbox
                            sx={{
                                color: customTheme.palette.orangePV.main,
                                '&.Mui-checked': {
                                    color: customTheme.palette.orangePV.dark,
                                },
                            }}
                        />}
                    label="Mes jeux favories"
                />
                <FormControlLabel
                    value="Ma Langue"
                    control={
                        <Checkbox
                            sx={{
                                color: customTheme.palette.orangePV.main,
                                '&.Mui-checked': {
                                    color: customTheme.palette.orangePV.dark,
                                },
                            }}
                        />}
                    label="Ma langue"
                />
                <FormControlLabel
                    value="Micro"
                    control={
                        <Checkbox
                            sx={{
                                color: customTheme.palette.orangePV.main,
                                '&.Mui-checked': {
                                    color: customTheme.palette.orangePV.dark,
                                },
                            }}
                        />}
                    label="Micro"
                />
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