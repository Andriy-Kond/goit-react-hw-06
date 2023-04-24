import css from './Contacts.module.css';

// ^ Рефакторінг у Redux
import { useSelector } from 'react-redux';
import { MarkupContacts } from './MarkupContacts';

export const Contacts = () => {
  // Забираю лист контактів зі store Redux:
  // useSelector приймає функцію, яка приймає увесь store з Redux
  const contacts = useSelector(store => store.storeContacts.stateContacts);
  const filter = useSelector(store => store.storeFilter.stateFilter);

  // Фільтрація контактів:
  const filteredContacts = filter
    ? contacts.filter(({ name }) =>
        name.toLowerCase().includes(filter.toLowerCase())
      )
    : contacts;

  // Рендер відфільтрованих контактів:
  return (
    // Щоби не було пустого ul:
    filteredContacts.length !== 0 && (
      <ul className={css.list}>
        {filteredContacts.map(({ name, number, id }) => {
          return (
            <MarkupContacts
              key={id}
              name={name}
              number={number}
              id={id}
            ></MarkupContacts>
          );
        })}
      </ul>
    )
  );
};
