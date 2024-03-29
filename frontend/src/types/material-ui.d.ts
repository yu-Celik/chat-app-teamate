import '@mui/material/styles';

declare module '@mui/material/styles' {
    interface Palette {
        noirTransparent: PaletteColor
        purplePV: PaletteColor
        bluePV: PaletteColor
        orangePV: PaletteColor
        transparant: PaletteColor
        slate: PaletteColor
        dark: PaletteColor
    }
    interface PaletteOptions {
        noirTransparent: PaletteColorOptions
        purplePV: PaletteColorOptions
        bluePV: PaletteColorOptions
        orangePV: PaletteColorOptions
        transparant: PaletteColorOptions
        slate: PaletteColorOptions
        dark: PaletteColorOptions
    }
    interface CustomTheme extends Theme {
        backgroundImage: {
            linearGradient: {
                toRight: string;
            };
        };
    }
    interface BreakpointOverrides {
        xss: true;
        xs: true;
        sm: true;
        md: true;
        lg: true;
        xl: true;
    }
}
