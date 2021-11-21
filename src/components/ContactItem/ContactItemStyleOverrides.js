import { createTheme } from "@mui/material/styles";

const themeBtn = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          height: "20px",
          width: "76px",
          padding: "2px 5px",
          fontFamily: "Signika",
          fontSize: "16px",
          textTransform: "capitalize",
          color: "#000000",
          borderColor: "#000000",
          "&:hover": {
            color: "#f0850c",
            borderColor: "#f0850c",
            backgroundColor: "#000000",
          },
        },

        startIcon: {
          marginRight: "5px",
        },
      },
    },
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          width: "16px",
          height: "auto",
        },
      },
    },
    MuiLoadingButton: {
      styleOverrides: {
        loadingIndicator: {
          left: "5px",
        },
      },
    },
  },
});

export default themeBtn;
