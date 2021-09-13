import React from 'react';
import PropTypes from 'prop-types';

const Dropdown = ({ data, defaultSelected, parentCallback }) => {
  const handleChange = (e) => {
    let valueSelected = e.target.value;
    parentCallback(valueSelected);
    e.preventDefault();
  };
  return (
    <div>
      <select
        className='filter-item'
        defaultValue={defaultSelected}
        onChange={handleChange}
      >
        {data.map((item, key) => {
          return (
            <option key={key} value={item.value}>
              {item.label}
            </option>
          );
        })}
      </select>
    </div>
  );
};

Dropdown.propTypes = {
  value: PropTypes.string,
  data: PropTypes.array.isRequired,
};

Dropdown.defaultProps = {
  value: '',
};

export default Dropdown;
