import { useSelector, useDispatch } from "react-redux";
import Loader from "react-loading";
import s from "./ModalEditor.module.css";
import { modalVisible } from "../../redux/contacts/contacts-actions";
import { getLoading } from "../../redux/contacts/contacts-selectors";
import EditForm from "../EditForm/EditForm";

function ModalEditor() {
  const dispatch = useDispatch();
  const isLoading = useSelector(getLoading);

  const handleCloseModal = (e) => {
    if (e.currentTarget === e.target || e.key === "Escape") {
      // document.querySelector("body").style.overflowY = "visible";
      dispatch(modalVisible(false));
      //   window.removeEventListener("keydown", handleCloseModal);
    }
  };

  return (
    <div onClick={handleCloseModal} className={s.backDrop}>
      <div className={s.modal}>
        <button onClick={handleCloseModal} type="button">
          Close
        </button>

        {isLoading ? (
          <Loader
            className={s.loader}
            type={"spinningBubbles"}
            color={"#2b2626"}
            height={50}
            width={50}
          />
        ) : (
          <EditForm />
        )}
      </div>
    </div>
  );
}

export default ModalEditor;
