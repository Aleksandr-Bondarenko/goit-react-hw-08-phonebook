import { createTheme } from "@mui/material/styles";

const themeUserForm = createTheme({
  components: {
    MuiInput: {
      styleOverrides: {
        root: {
          color: "#ffffffb0",
          backgroundColor: "transparent",
          "&:after": {
            borderBottomColor: "#ffffffb0",
          },
        },

        input: {
          width: "350px",
          fontFamily: "Signika",
          fontSize: "20px",
          color: "#000000",
          padding: "0",
        },
      },
    },

    MuiInputLabel: {
      styleOverrides: {
        root: {
          "&.Mui-focused": {
            color: "#ffffffb0",
          },
        },
      },
    },

    MuiLoadingButton: {
      styleOverrides: {
        root: {
          height: "30px",
          padding: "2px 5px",
          fontFamily: "Signika",
          fontSize: "16px",
          textTransform: "capitalize",
          color: "rgba(0, 0, 0, 0.54)",
          borderColor: "rgba(0, 0, 0, 0.54)",
          "&:hover": {
            color: "#000000",
            borderColor: "#ffffffcc",
            boxShadow: "inset 0 0 10px 1px #ffffffcc",
          },
        },
      },
    },
  },
});

export default themeUserForm;
