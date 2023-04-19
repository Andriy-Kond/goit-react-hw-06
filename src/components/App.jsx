// Todo: Прокинути пропси за допомогою Context

// import { Component } from 'react';
import { UserForm } from './UserForm/UserForm';
import { Contacts } from './Contacts/Contacts';
import { Filter } from './Filter/Filter';
import css from './App.module.css';
import { useEffect, useState } from 'react';

// * Рефакторінг у Хуки
export const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  // const [contacts, setContacts] = useState(
  //   JSON.parse(window.localStorage.getItem('contacts') ?? [])
  // );

  useEffect(() => {
    const contactsFromLS = localStorage.getItem('contacts');
    const contactsFromLSParced = JSON.parse(contactsFromLS);
    contactsFromLSParced && setContacts(contactsFromLSParced);
  }, []);

  useEffect(() => {
    // щоб не запускався на першому рендері (didMount) перевіряємо чи є масив:
    contacts.length &&
      localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  // Створення нового контакту:
  const createUser = userData => {
    const isExist = contacts.find(contact => {
      return contact.name === userData.name;
    });

    if (isExist) {
      // алерт працює як ретурн
      alert(`${userData.name} is already in contacts`);
    } else {
      setContacts(prevState => {
        return [...prevState, userData];
      });

      return true; // для використання у UserForm
    }
  };

  // Отримання даних з поля input у компоненті Filter
  const getInput = ({ target: { value } }) => {
    setFilter(value);
  };

  // Видалення контакту:
  const deleteContact = contactId => {
    setContacts(prevState => {
      return prevState.filter(contact => contact.id !== contactId);
    });
  };

  // Повертаю розмітку:
  return (
    <div className={css.mainContainer}>
      <h1>Phonebook</h1>
      <UserForm createUser={createUser}></UserForm>

      <h2>Contacts</h2>
      <Filter filter={filter} getInput={getInput}></Filter>

      <Contacts
        contacts={
          filter
            ? contacts.filter(({ name }) =>
                name.toLowerCase().includes(filter.toLowerCase())
              )
            : contacts
        }
        deleteContact={deleteContact}
      ></Contacts>
    </div>
  );
};

// export class App extends Component {
//   state = {
//     contacts: [],
//     filter: '',
//   };

//   componentDidMount() {
//     const contactsFromLS = localStorage.getItem('contacts');
//     const contactsFromLSParced = JSON.parse(contactsFromLS);
//     contactsFromLSParced && this.setState({ contacts: contactsFromLSParced });
//   }

//   componentDidUpdate(prevProps, prevState) {
//     if (this.state.contacts !== prevState.contacts) {
//       localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
//     }
//   }

//   createUser = userData => {
//     const isExist = this.state.contacts.find(contact => {
//       return contact.name === userData.name;
//     });

//     if (isExist) {
//       alert(`${userData.name} is already in contacts`);
//     } else {
//       this.setState(prevState => {
//         return { contacts: [...prevState.contacts, userData] };
//       });

//       return userData.name;
//     }
//   };

//   getInput = ({ target: { name, value } }) => {
//     this.setState({ [name]: value });
//   };

//   filterContacts = () => {
//     this.state.contacts.filter(contact =>
//       contact.name.toLowerCase().includes(this.state.filter.toLowerCase())
//     );
//   };

//   deleteContact = contactId => {
//     this.setState(prevState => ({
//       contacts: prevState.contacts.filter(contact => contact.id !== contactId),
//     }));
//   };

//   render() {
//     const { filter, contacts } = this.state;
//     return (
//       <div className={css.mainContainer}>
//         <h1>Phonebook</h1>
//         <UserForm createUser={this.createUser}></UserForm>

//         <h2>Contacts</h2>
//         <Filter filter={filter} getInput={this.getInput}></Filter>

//         <Contacts
//           contacts={
//             filter
//               ? contacts.filter(({ name }) =>
//                   name.toLowerCase().includes(filter.toLowerCase())
//                 )
//               : contacts
//           }
//           deleteContact={this.deleteContact}
//         ></Contacts>
//       </div>
//     );
//   }
// }
