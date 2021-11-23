import { useDispatch } from "react-redux";
import s from "./ModalEditor.module.css";
import { modalVisible } from "../../redux/contacts/contacts-actions";
import EditForm from "../EditForm/EditForm";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import { ThemeProvider, createTheme } from "@mui/material/styles";

function ModalEditor() {
  const dispatch = useDispatch();

  const handleCloseModal = (e) => {
    if (e.currentTarget === e.target || e.key === "Escape") {
      dispatch(modalVisible(false));
      document.querySelector("body").style.overflowY = "visible";
      window.removeEventListener("keydown", handleCloseModal);
    }
  };
  document.querySelector("body").style.overflowY = "hidden";
  window.addEventListener("keydown", handleCloseModal);

  const themeCloseBtn = createTheme({
    components: {
      MuiSvgIcon: {
        styleOverrides: {
          root: {
            width: "35px",
            height: "35px",

            fill: "#ffffffcc",
            position: "relative",
            transition: "fill 300ms linear",
            "&:hover": {
              zIndex: "-100",
            },
          },
        },
      },
    },
  });

  return (
    <div onClick={handleCloseModal} className={s.backDrop}>
      <div className={s.modal}>
        <button className={s.closeBtn} onClick={handleCloseModal} type="button">
          <ThemeProvider theme={themeCloseBtn}>
            <CancelOutlinedIcon />
          </ThemeProvider>
        </button>

        <EditForm />
      </div>
    </div>
  );
}

export default ModalEditor;
