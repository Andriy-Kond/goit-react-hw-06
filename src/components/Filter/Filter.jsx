import css from './Filter.module.css';
import PropTypes from 'prop-types';

export const Filter = ({ filter, getInput }) => {
  return (
    <div className={css.inputWrapper}>
      <label htmlFor="searchInput">Find contacts by name</label>
      <input
        id="searchInput"
        type="text"
        name="filter"
        onChange={getInput}
        value={filter}
      />
    </div>
  );
};

Filter.propTypes = {
  filter: PropTypes.string.isRequired,
  getInput: PropTypes.func.isRequired,
};
