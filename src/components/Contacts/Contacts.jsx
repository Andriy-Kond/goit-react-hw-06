import PropTypes from 'prop-types';
import css from './Contacts.module.css';

function MarkupContacts({ name, number, id, deleteContact }) {
  return (
    <li className={css.listItem}>
      {name}: {number}
      <button className={css.deleteBtn} onClick={() => deleteContact(id)}>
        Delete
      </button>
    </li>
  );
}

export const Contacts = ({ contacts, deleteContact }) => {
  return (
    <ul className={css.list}>
      {contacts.map(({ name, number, id }) => {
        return (
          <MarkupContacts
            key={id}
            name={name}
            number={number}
            id={id}
            deleteContact={deleteContact}
          ></MarkupContacts>
        );
      })}
    </ul>
  );
};

Contacts.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.exact({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ).isRequired,
  deleteContact: PropTypes.func.isRequired,
};
