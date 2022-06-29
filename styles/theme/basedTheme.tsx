import { createTheme, ThemeOptions, Theme } from "@mui/material/styles";
import { PaletteOptions } from "@material-ui/core/styles/createPalette";

interface IPaletteOptions extends PaletteOptions {
  gradient: {
    main: string;
  };
}
interface ITheme extends Theme {
  palette: any;
}

export const basedTheme = createTheme({
  palette: {
    primary: {
      main: "#1273EA ",
      dark: "#EDF1F7",
      light: "#FFFFFF",
    },
    secondary: {
      main: "#F7F9FC",
      dark: "#151A30",
      light: "#8F9BB3",
    },
    info: {
      main: "#57627B",
      dark: "#C5CEE0",
      light: "#231F20",
    },
    warning: {
      main: "#ef1414",
      dark: "#68B8F8",
      light: "#8DC9F9",
    },
    success: {
      main: "#EEF3FB",
      dark: "#57627B",
    },
    gradient: {
      main: "linear-gradient(256.28deg, #1C94F4 0%, #1273EA 100%)",
    },
  },
  typography: {
    fontFamily: "SFProText, sans-serif",
    fontWeightLight: 200,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightSmallBold: 600,
    fontWeightBold: 700,
    h1: {
      fontSize: "32px",
      lineHeight: "40px",
    },
    h2: {
      fontSize: "20px",
      lineHeight: "28px",
    },
    h3: {
      fontSize: "16px",
      lineHeight: "20px",
    },
    h3VariantPrimary: {
      fontSize: "16px",
      lineHeight: "24px",
    },
    h4: {
      fontSize: "14px",
      lineHeight: "20px",
    },
    h5: {
      fontSize: "12px",
      lineHeight: "20px",
    },
    h6: {
      fontSize: "10px",
      lineHeight: "16px",
    },
  },
} as ThemeOptions);
