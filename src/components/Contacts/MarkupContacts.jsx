import PropTypes from 'prop-types';
import css from './Contacts.module.css';

// ^ Рефакторінг у Redux
import { useDispatch } from 'react-redux';
import { deleteInStateContact } from 'store/phoneBookSlice';

export function MarkupContacts({ name, number, id }) {
  const dispatch = useDispatch();

  return (
    <li className={css.listItem}>
      {name}: {number}
      <button
        className={css.deleteBtn}
        onClick={() => dispatch(deleteInStateContact({ id }))}
      >
        Delete
      </button>
    </li>
  );
}

MarkupContacts.propTypes = {
  name: PropTypes.string.isRequired,
  number: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
};
