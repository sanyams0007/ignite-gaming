import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  typography: {
    fontFamily: "Electronic Arts Text, Roboto",
    h2: {
      fontSize: "2.5rem",
      fontFamily: "Playfair Display",
      fontWeight: "600",
    },
  },
  palette: {
    primary: {
      main: "#9922ee",
    },
    secondary: {
      main: "#DD22CC",
    },
    background: {
      paper: "transparent",
    },
    text: {
      primary: "#fff",
      secondary: "#000",
    },
  },
  overrides: {
    MuiCssBaseline: {
      "@global": {
        "@font-face": ["Electronic Arts Text"],
      },
    },
    MuiButton: {
      root: {
        color: "#fff",
        textTransform: "none",
        borderRadius: "25px",
        padding: "7px 20px",
        boxShadow: "none",
        fontSize: "16px",
      },
      label: {
        color: "#fff",
      },
      text: {
        padding: "7px 20px",
      },
    },
    MuiSvgIcon: {
      root: {
        /* color: "white", */
      },
    },
    MuiTypography: {
      root: {
        color: "#fff",
      },
    },
    MuiTextField: {
      root: {
        backgroundColor: "#fff",
      },
    },
    MuiInputBase: {
      input: {
        color: "#000",
      },
    },
    MuiSlider: {
      root: {
        color: "#9922ee",
      },
      markLabel: {
        color: "#fff",
      },
      rail: {
        background: "linear-gradient(145deg, #72f, #c1b)",
      },
      track: {
        background: "linear-gradient(145deg, #72f, #c1b)",
      },
    },
    MuiDivider: {
      root: {
        backgroundColor: "rgba(255, 255, 255, 0.12)",
      },
    },
    MuiPagination: {
      root: {
        width: "fit-content",
        margin: "auto",
      },
    },
    MuiFormLabel: {
      root: {
        color: "#fff!important",
      },
    },
  },
});

export default theme;
