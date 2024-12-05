import React from 'react';
import Select from 'react-select';
import RemoteWorkIcons from './RemoteWorkIcons.jsx';
import { CONFIG_REMOTE_WORK } from '../../utils/config.js';

const RemoteWorkSelect = ({ value, onChange, isView }) => {
  const options = CONFIG_REMOTE_WORK.map((option) => ({
    value: option.value,
    label: (
      <div className="flex items-center space-x-2">
        <RemoteWorkIcons remoteWork={option.value} />
        <span>{option.label}</span>
      </div>
    ),
  }));

  const handleChange = (selectedOption) => {
    if (selectedOption) {
      onChange(selectedOption.value);
    }
  };

  return (
    <div>
      {isView ? (
        <span className="text-[#7b6f9f]">
          {options.find(option => option.value === value)?.label}
        </span>
      ) : (
        <Select
          value={options.find((option) => option.value === value)}
          onChange={handleChange}
          options={options}
          classNamePrefix="react-select"
          placeholder='Télétravail'
          styles={{
            control: (provided, state) => ({
              ...provided,
              backgroundColor: '#1c1825',
              borderColor: state.isFocused ? '#484451' : '#484451',
              borderRadius: '0.375rem',
              padding: '0.25rem',
              boxShadow: state.isFocused
                ? '0 0 0 2px #1c1825, 0 0 0 4px #484451'
                : 'none',
              outline: 'none',
              transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
              ':hover': {
                borderColor: '#484451',
                boxShadow: 'none',
              },
            }),
            option: (provided, state) => ({
              ...provided,
              backgroundColor: state.isSelected ? '#484451' : '#1c1825',
              color: '#F8F6FE',
              padding: '0.5rem',
              display: 'flex',
              alignItems: 'center',
              fontSize: '0.875rem',
              cursor: 'pointer',
              '&:hover': {
                backgroundColor: '#272334',
              },
            }),
            singleValue: (provided) => ({
              ...provided,
              display: 'flex',
              alignItems: 'center',
              fontSize: '0.875rem',
              padding: '0px 6px',
              height: '34px',
            }),
            dropdownIndicator: (provided) => ({
              ...provided,
              color: '#F8F6FE',
            }),
            indicatorSeparator: (provided) => ({
              ...provided,
              backgroundColor: '#484451',
            }),
            menu: (provided) => ({
              ...provided,
              backgroundColor: '#1c1825',
              borderColor: '#484451',
              borderRadius: '0.375rem',
            }),
            container: (provided) => ({
              ...provided,
              width: '100%',
              margin: 0,
            }),
          }}
        />
      )}
    </div>
  );
};

export default RemoteWorkSelect;
