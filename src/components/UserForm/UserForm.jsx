import css from './UserForm.module.css';
import { useState } from 'react';

// ^ Рефакторінг у Redux
// Для звертання до стору Redux - useSelector, для запуску необхідної дії (необхідного редюсера) - useDispatch
import { useDispatch, useSelector } from 'react-redux';
import { addInStateContact } from '../../store/phoneBookSlice';
import { nanoid } from '@reduxjs/toolkit';

export const UserForm = () => {
  // dispatch - це як тригер, що відбулась подія. Але нам треба вказати яка саме
  const dispatch = useDispatch();
  const contacts = useSelector(store => store.storeContacts.stateContacts);

  // Локальні стейти немає сенсу переносити у глобальний Redux:
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  // Записую дані полів інпут у відповідні стейти
  const getInput = ({ target: { name, value } }) => {
    if (name === 'name') {
      setName(value);
    } else {
      setNumber(value);
    }
  };

  // Спроба записати новий контакт
  const setContact = e => {
    e.preventDefault();

    const isExist = contacts.find(contact => contact.name === name);

    if (isExist) {
      // alert працює як return
      alert(`${name} is already in contacts`);
    } else {
      const isCreated = dispatch(
        addInStateContact({
          name,
          number,
          id: nanoid(),
        })
      );

      // Якщо новий об'єкт створений успішно, то обнуляємо поля інпутів у формі
      if (isCreated) {
        setName('');
        setNumber('');
      }
    }
  };

  // Повертаю розмітку:
  return (
    <form className={css.addUserForm} onSubmit={setContact}>
      <div className={css.userFormWrapper}>
        <div className={css.inputWrapper}>
          <label className={css.formLabel} htmlFor="UserId">
            Name
          </label>
          <input
            className={css.formInput}
            id="UserId"
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            onChange={getInput}
            value={name}
          />
        </div>

        <div className={css.inputWrapper}>
          <label className={css.formLabel} htmlFor="number">
            Phone Number
          </label>
          <input
            className={css.formInput}
            id="number"
            onChange={getInput}
            value={number}
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          />
        </div>

        <button className={css.submitBtn} type="submit">
          Add contact
        </button>
      </div>
    </form>
  );
};
