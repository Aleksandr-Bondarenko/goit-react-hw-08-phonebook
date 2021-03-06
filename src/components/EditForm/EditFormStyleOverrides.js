import { createTheme } from "@mui/material/styles";

const themeEditForm = createTheme({
  components: {
    MuiInput: {
      styleOverrides: {
        root: {
          marginBottom: "20px",
          width: "280px",
          "&:after": {
            borderBottomColor: "#f0850c",
          },
        },
        input: {
          fontFamily: "Signika",
          fontSize: "16px",
          color: "#ffffffcc",
        },
      },
    },

    MuiInputLabel: {
      styleOverrides: {
        root: {
          width: "130px",
          fontFamily: "Signika",
          fontSize: "16px",
          color: "#ffffffcc",
        },
      },
    },

    MuiSvgIcon: {
      styleOverrides: {
        root: {
          fill: "#f0850c",
        },
      },
    },
    MuiLoadingButton: {
      styleOverrides: {
        root: {
          height: "30px",
          width: "190px",
          padding: "2px 5px",
          fontFamily: "Signika",
          fontSize: "16px",
          textTransform: "capitalize",
          color: "#ffffffcc",
          borderColor: "#ffffffcc",
          "&:hover": {
            color: "#f0850c",
            borderColor: "#f0850c",
            boxShadow: "inset 0 0 10px 1px #ffffffcc",
          },
        },

        endIcon: {
          marginLeft: "5px",
        },
      },
    },
  },
});

export default themeEditForm;
