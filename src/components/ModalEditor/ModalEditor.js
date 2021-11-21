import { useSelector, useDispatch } from "react-redux";
// import Loader from "react-loading";
import s from "./ModalEditor.module.css";
import { modalVisible } from "../../redux/contacts/contacts-actions";
// import { getLoading } from "../../redux/contacts/contacts-selectors";
import EditForm from "../EditForm/EditForm";
import IconButton from "@mui/material/IconButton";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import { ThemeProvider, createTheme } from "@mui/material/styles";

function ModalEditor() {
  const dispatch = useDispatch();
  // const isLoading = useSelector(getLoading);

  const handleCloseModal = (e) => {
    console.log(e.currentTarget);
    console.log(e.target);
    if (e.currentTarget === e.target || e.key === "Escape") {
      // document.querySelector("body").style.overflowY = "visible";
      dispatch(modalVisible(false));
      //   window.removeEventListener("keydown", handleCloseModal);
    }
  };

  const themeCloseBtn = createTheme({
    components: {
      MuiIconButton: {
        styleOverrides: {
          root: {
            position: "absolute",
            top: "15px",
            right: "15px",
            padding: "5px",

            transition: "backgroundColor 300ms linear",
            "&:hover": {
              backgroundColor: "#18171780",
            },
          },
        },
      },

      MuiSvgIcon: {
        styleOverrides: {
          root: {
            width: "35px",
            height: "35px",
            transition: "fill 300ms linear",
            "&:hover": {
              fill: "#f0860c",
            },
          },
        },
      },
    },
  });

  return (
    <div onClick={handleCloseModal} className={s.backDrop}>
      <div className={s.modal}>
        {/* <ThemeProvider theme={themeCloseBtn}>
          <IconButton onClick={(e) => handleCloseModal(e)} aria-label="close">
            <CancelOutlinedIcon />
          </IconButton>
        </ThemeProvider> */}

        <button onClick={handleCloseModal} type="button">
          Close
        </button>

        <EditForm />

        {/* {false ? (
          <Loader
            className={s.loader}
            type={"spinningBubbles"}
            color={"#2b2626"}
            height={50}
            width={50}
          />
        ) : (
          <EditForm />
        )} */}
      </div>
    </div>
  );
}

export default ModalEditor;
