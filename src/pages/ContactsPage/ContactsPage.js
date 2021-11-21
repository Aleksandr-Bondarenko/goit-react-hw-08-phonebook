import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Loader from "react-loading";

import { fetchContacts } from "../../redux/contacts/contacts-operations";
import ContactForm from "../../components/ContactForm/ContactForm";
import Filter from "../../components/Filter/Filter";
import ContactsList from "../../components/ContactsList/ContactsList.js";
import {
  getLoading,
  getFilter,
  getVisibleContacts,
} from "../../redux/contacts/contacts-selectors";
import { getAuthLoading } from "../../redux/auth/auth-selectors";
import s from "./ContactsPage.module.css";

function ContactsPage() {
  const visibleContacts = useSelector(getVisibleContacts);
  const filter = useSelector(getFilter);
  const isContactsLoading = useSelector(getLoading);
  const isLogOut = useSelector(getAuthLoading);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <div className={s.box}>
      {isLogOut && (
        <Loader
          className={s.logoutLoader}
          type={"spinningBubbles"}
          color={"#2b2626"}
          height={80}
          width={80}
        />
      )}

      <div className={s.leftSide}>
        <p className={s.title}>Add new contact:</p>
        <ContactForm />
      </div>

      <div className={s.rightSide}>
        <p className={s.title}>Contacts list:</p>
        <Filter />
        {visibleContacts.length === 0 ? (
          isContactsLoading ? (
            <Loader
              className={"ContactsLoader"}
              type={"spinningBubbles"}
              color={"#2b2626"}
              height={80}
              width={80}
            />
          ) : (
            <p className={s.notifyText}>
              {filter.length > 0
                ? "No results for your search"
                : "No contacts yet"}
            </p>
          )
        ) : (
          <ContactsList />
        )}
      </div>
    </div>
  );
}

export default ContactsPage;
