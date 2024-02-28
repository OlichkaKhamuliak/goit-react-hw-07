import css from "./App.module.css";
import { ContactForm } from "./components/ContactForm/ContactForm";
import { SearchBox } from "./components/SearchBox/SearchBox";
import { ContactList } from "./components/ContactList/ContactList";
import { FaAddressBook } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  selectContacts,
  selectFilter,
  selectVisibleContacts,
} from "./redux/selectors";
import { useEffect } from "react";
import { setFilter } from "./redux/filterSlice";

export const App = () => {
  const dispatch = useDispatch();

  const contacts = useSelector(selectContacts);
  const filter = useSelector(selectFilter);
  const visibleContacts = useSelector(selectVisibleContacts);

  //Скидуємо фільтр коли масив контактів порожній
  useEffect(() => {
    if (contacts.length === 0) {
      dispatch(setFilter(""));
    }
  }, [contacts, dispatch]);

  return (
    <div style={{ padding: 8 }}>
      <h1 className={css.title}>
        <FaAddressBook className={css.icon} />
        Phone Book
      </h1>
      <ContactForm />
      {contacts.length > 0 ? (
        <SearchBox />
      ) : (
        <p className={`${css.text} ${css.noContacts}`}>
          You don`t have any contacts yet.
        </p>
      )}
      {visibleContacts.length > 0 ? (
        <ContactList />
      ) : (
        contacts.length > 0 && (
          <p className={css.text}>No matches found for `{filter}`</p>
        )
      )}
    </div>
  );
};
