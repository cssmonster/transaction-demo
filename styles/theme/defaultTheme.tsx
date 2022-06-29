import { createTheme } from "@mui/material/styles";
import { basedTheme } from "./basedTheme";

export const defaultTheme = createTheme({
  components: {
    MuiButton: {
      variants: [
        {
          props: { variant: "filled" },
          style: {
            textTransform: "none",
            height: "40px",
            borderRadius: "8px",
            background: (basedTheme.palette as any).gradient.main,
            ...basedTheme.typography.h4,
            color: basedTheme.palette.primary.light,
            paddingLeft: "20px",
            paddingRight: "20px",
            fontWeight: 600,

            "& .MuiCircularProgress-svg": {
              color: basedTheme.palette.primary.light,
            },
          },
        },
        {
          props: { variant: "unfilled" },
          style: {
            textTransform: "none",
            height: "40px",
            borderRadius: "8px",
            background: (basedTheme.palette as any).secondary.main,
            ...basedTheme.typography.h4,
            color: basedTheme.palette.primary.main,
            paddingLeft: "20px",
            paddingRight: "20px",
            fontWeight: 600,
            "& .MuiCircularProgress-svg": {
              color: basedTheme.palette.primary.light,
            },
          },
        },
      ],
    },
  },
  palette: basedTheme.palette,
  typography: {
    ...basedTheme.typography,
    h1: {
      ...basedTheme.typography.h1,
      color: basedTheme.palette.secondary.dark,
    },
    h2: {
      ...basedTheme.typography.h2,
      color: basedTheme.palette.secondary.dark,
    },
    h3: {
      ...basedTheme.typography.h3,
      color: basedTheme.palette.secondary.dark,
    },
    h3VariantPrimary: {
      fontSize: "16px",
      lineHeight: "24px",
      color: basedTheme.palette.secondary.dark,
    },
    h4: {
      ...basedTheme.typography.h4,
      color: basedTheme.palette.secondary.dark,
    },
    h5: {
      ...basedTheme.typography.h5,
      color: basedTheme.palette.secondary.dark,
    },
    h5VariantPrimary: {
      fontSize: "12px",
      lineHeight: "16px",
      color: basedTheme.palette.secondary.dark,
    },
    h6: {
      ...basedTheme.typography.h6,
      color: basedTheme.palette.secondary.dark,
    },
    h1_InterFontFamily: {
      ...basedTheme.typography.h1,
      fontFamily: "Inter, sans-serif",
      color: basedTheme.palette.secondary.dark,
    },
    h2_InterFontFamily: {
      ...basedTheme.typography.h2,
      fontFamily: "Inter, sans-serif",
      color: basedTheme.palette.secondary.dark,
    },
    h3_InterFontFamily: {
      ...basedTheme.typography.h3,
      fontFamily: "Inter, sans-serif",
      color: basedTheme.palette.secondary.dark,
    },
    h3VariantPrimary_InterFontFamily: {
      fontSize: "16px",
      lineHeight: "24px",
      fontFamily: "Inter, sans-serif",
      color: basedTheme.palette.secondary.dark,
    },
    h4_InterFontFamily: {
      ...basedTheme.typography.h4,
      fontFamily: "Inter, sans-serif",
      color: basedTheme.palette.secondary.dark,
    },
    h5_InterFontFamily: {
      ...basedTheme.typography.h5,
      fontFamily: "Inter, sans-serif",
      color: basedTheme.palette.secondary.dark,
    },
    h5VariantPrimary_InterFontFamily: {
      fontSize: "12px",
      lineHeight: "16px",
      fontFamily: "Inter, sans-serif",
      color: basedTheme.palette.secondary.dark,
    },
    h6_InterFontFamily: {
      ...basedTheme.typography.h6,
      fontFamily: "Inter, sans-serif",
      color: basedTheme.palette.secondary.dark,
    },
  },
});

declare module "@mui/material/styles" {
  interface TypographyVariants {
    h3VariantPrimary: React.CSSProperties;
    h5VariantPrimary: React.CSSProperties;
    h1_InterFontFamily: React.CSSProperties;
    h2_InterFontFamily: React.CSSProperties;
    h3_InterFontFamily: React.CSSProperties;
    h3VariantPrimary_InterFontFamily: React.CSSProperties;
    h4_InterFontFamily: React.CSSProperties;
    h5_InterFontFamily: React.CSSProperties;
    h5VariantPrimary_InterFontFamily: React.CSSProperties;
    h6_InterFontFamily: React.CSSProperties;
  }
  interface TypographyVariantsOptions {
    h3VariantPrimary?: React.CSSProperties;
    h5VariantPrimary?: React.CSSProperties;
    h1_InterFontFamily?: React.CSSProperties;
    h2_InterFontFamily?: React.CSSProperties;
    h3_InterFontFamily?: React.CSSProperties;
    h3VariantPrimary_InterFontFamily?: React.CSSProperties;
    h4_InterFontFamily?: React.CSSProperties;
    h5_InterFontFamily?: React.CSSProperties;
    h5VariantPrimary_InterFontFamily?: React.CSSProperties;
    h6_InterFontFamily?: React.CSSProperties;
  }
}

declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    h3VariantPrimary: true;
    h5VariantPrimary: true;
    h1_InterFontFamily: true;
    h2_InterFontFamily: true;
    h3_InterFontFamily: true;
    h3VariantPrimary_InterFontFamily: true;
    h4_InterFontFamily: true;
    h5_InterFontFamily: true;
    h5VariantPrimary_InterFontFamily: true;
    h6_InterFontFamily: true;
  }
}

declare module "@mui/material/Button" {
  interface ButtonPropsVariantOverrides {
    filled: true;
    unfilled: true;
  }
}
