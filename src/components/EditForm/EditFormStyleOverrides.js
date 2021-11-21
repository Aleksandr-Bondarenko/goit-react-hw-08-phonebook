import { createTheme } from "@mui/material/styles";

const themeEditForm = createTheme({
  components: {
    MuiInput: {
      styleOverrides: {
        root: {
          marginBottom: "20px",
          "&:after": {
            borderBottomColor: "#f0850c",
          },
        },
        input: {
          fontFamily: "Signika",
          fontSize: "16px",
          // textTransform: "capitalize",
          color: "#ffffff",
        },

        // startIcon: {
        //   marginRight: "5px",
        // },
      },
    },

    MuiInputLabel: {
      styleOverrides: {
        root: {
          width: "130px",
          fontFamily: "Signika",
          fontSize: "16px",
          color: "#ffffff",
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
    // MuiLoadingButton: {
    //   styleOverrides: {
    //     loadingIndicator: {
    //       left: "5px",
    //     },
    //   },
    // },
  },
});

export default themeEditForm;
