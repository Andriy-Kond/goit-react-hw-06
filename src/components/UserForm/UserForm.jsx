import PropTypes from 'prop-types';
import css from './UserForm.module.css';
import { useState } from 'react';
import { nanoid } from 'nanoid';

// * Рефакторінг у Хуки
export const UserForm = ({ createUser }) => {
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

    const isCreated = createUser({
      name,
      number,
      id: nanoid(),
    });

    // Якщо новий об'єкт створений успішно, то обнуляємо поля інпутів у формі
    if (isCreated) {
      setName('');
      setNumber('');
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

// export class UserForm extends Component {
// state = {
//   name: '',
//   number: '',
// };

//   getInput = ({ target: { name, value } }) => {
//     this.setState({ [name]: value });
//   };

//   setName = e => {
//     e.preventDefault();

//     const userName = this.props.createUser({
//       name: this.state.name,
//       number: this.state.number,
//       id: nanoid(),
//     });

//     userName && this.setState({ name: '', number: '' });
//   };

//   render() {
//     return (
//       <form className={css.addUserForm} onSubmit={this.setName}>
//         <div className={css.userFormWrapper}>
//           <div className={css.inputWrapper}>
//             <label className={css.formLabel} htmlFor="UserId">
//               Name
//             </label>
//             <input
//               className={css.formInput}
//               id="UserId"
//               type="text"
//               name="name"
//               pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
//               title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
//               required
//               onChange={this.getInput}
//               value={this.state.name}
//             />
//           </div>

//           <div className={css.inputWrapper}>
//             <label className={css.formLabel} htmlFor="number">
//               Phone Number
//             </label>
//             <input
//               className={css.formInput}
//               id="number"
//               onChange={this.getInput}
//               value={this.state.number}
//               type="tel"
//               name="number"
//               pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
//               title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
//               required
//             />
//           </div>

//           <button className={css.submitBtn} type="submit">
//             Add contact
//           </button>
//         </div>
//       </form>
//     );
//   }
// }

UserForm.propTypes = {
  createUser: PropTypes.func.isRequired,
};
