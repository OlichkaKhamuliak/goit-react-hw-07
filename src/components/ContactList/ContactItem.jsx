import { useState } from "react";
import css from "./ContactList.module.css";
import { IoPersonRemove } from "react-icons/io5";
import { IoPerson } from "react-icons/io5";
import { FaPhone } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { deleteContact, updateContact } from "../../redux/operation";
import { MdModeEditOutline } from "react-icons/md";
import { GrUpdate } from "react-icons/gr";

export const Contact = ({ contact: { name, phone, id } }) => {
  const dispatch = useDispatch();

  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(name);
  const [editedPhone, setEditedPhone] = useState(phone);

  const handleUpdateContact = () => {
    if (editedName.trim() !== "" && editedPhone.trim() !== "") {
      const updatedData = {
        name: editedName,
        phone: editedPhone,
      };
      dispatch(updateContact({ contactId: id, updatedData }));
      setIsEditing(false); // Після оновлення закриваємо поля для редагування
    }
  };

  return (
    <div className={css.wrap}>
      <div className={css.itemContent}>
        {/* Показуємо редаговані поля тільки при натисканні на кнопку "Edit" */}
        {!isEditing ? (
          <>
            <p className={css.text}>
              <IoPerson className={css.icon} />
              {name}
            </p>
            <p className={css.text}>
              <FaPhone className={css.icon} />
              {phone}
            </p>
          </>
        ) : (
          <>
            <div className={css.editableField}>
              <IoPerson className={css.icon} />
              <input
                type="text"
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)}
              />
            </div>
            <div className={css.editableField}>
              <FaPhone className={css.icon} />
              <input
                type="tel"
                value={editedPhone}
                onChange={(e) => setEditedPhone(e.target.value)}
              />
            </div>
          </>
        )}
      </div>
      <div>
        {/* Показуємо кнопку "Edit" або "Update" залежно від стану редагування */}
        {!isEditing ? (
          <button className={css.btn} onClick={() => setIsEditing(true)}>
            <MdModeEditOutline className={css.icon} size="25" />
            Edit
          </button>
        ) : (
          <button className={css.btn} onClick={handleUpdateContact}>
            <GrUpdate className={css.icon} size="20" />
            Update
          </button>
        )}
        <button className={css.btn} onClick={() => dispatch(deleteContact(id))}>
          <IoPersonRemove className={css.icon} size="25" />
          Delete
        </button>
      </div>
    </div>
  );
};
