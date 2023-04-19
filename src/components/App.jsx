import { UserForm } from './UserForm/UserForm';
import { Contacts } from './Contacts/Contacts';
import { Filter } from './Filter/Filter';
import css from './App.module.css';

// ^ Рефакторінг у Redux
export const App = () => {
  // Повертаю розмітку:
  return (
    <div className={css.mainContainer}>
      <h1>Phonebook</h1>
      <UserForm />
      <h2>Contacts</h2>
      <Filter />
      <Contacts />
    </div>
  );
};
