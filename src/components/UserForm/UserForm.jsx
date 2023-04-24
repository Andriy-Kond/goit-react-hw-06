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
  const [userName, setUserName] = useState('');
  const [userNumber, setUserNumber] = useState('');

  // Записую дані полів інпут у відповідні стейти
  const getInput = ({ target: { name, value } }) => {
    if (name === 'name') {
      setUserName(value);
    } else {
      setUserNumber(value);
    }
  };

  // Спроба записати новий контакт
  const setContact = e => {
    e.preventDefault();

    // Перевірка чи є вже такий контакт:
    const isExist = contacts.find(contact => contact.name === userName);

    if (isExist) {
      // alert працює як return
      alert(`${userName} is already in contacts`);
    } else {
      // спроба створити об'єкт:
      const isCreated = dispatch(
        addInStateContact({
          userName,
          number: Number(userNumber), // інакше записується як рядок
          id: nanoid(),
        })
      );

      // Якщо новий об'єкт створений успішно, то обнуляємо поля інпутів у формі
      if (isCreated) {
        setUserName('');
        setUserNumber('');
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
            value={userName}
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
            value={userNumber}
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
