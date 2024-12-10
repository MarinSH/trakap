import React from 'react';
import Select from 'react-select';
import { CONFIG_TECH_STACK } from '../../utils/config.js';

const CustomSingleValue = ({ data }) => (
  <div className="flex items-center space-x-2 text-base-content">
    <i className={`${data.icon} text-xl`} />
    <span>{data.label}</span>
  </div>
);

const CustomMultiValue = ({ data, removeProps }) => (
  <div className="flex items-center px-2 py-1 bg-[#121018] text-xs text-[#F8F6FE] rounded-full space-x-1 mr-2 mb-2">
    <i className={`${data.icon} text-sm`} />
    <span className="text-xs">{data.label}</span>
    <button 
      {...removeProps} 
      className="ml-1 text-xs text-[#F8F6FE] hover:text-warning-500"
      title="Supprimer"
    >
      <i className="fa-solid fa-xmark"></i>
    </button>
  </div>
);

export default function TechStackSelect ({ value, onChange, isView }) {
  const options = CONFIG_TECH_STACK.map((tech) => ({
    value: tech,
    label: tech,
    icon: `fab fa-${tech.toLowerCase()}`,
  }));

  const handleChange = (selectedOptions) => {
    const newValues = selectedOptions ? selectedOptions.map((opt) => opt.value) : [];
    onChange(newValues);
  };

  const selectedTechs = options.filter(option => value.includes(option.value));

  const customOption = ({ data, innerRef, innerProps }) => (
    <div
      ref={innerRef}
      {...innerProps}
      className="flex items-center p-2 hover:bg-[#272334] rounded-md cursor-pointer transition-colors"
    >
      <i className={`${data.icon} text-lg mr-2`} />
      {data.label}
    </div>
  );

  return (
    <div>
      {isView ? (
        <div className="flex flex-wrap gap-2">
          {selectedTechs.length > 0 ? (
            selectedTechs.map((tech) => (
              <div key={tech.value} className="flex items-center px-3 py-1 bg-[#403956] text-xs text-[#F8F6FE] rounded-full mb-2 mr-2">
                <i className={`${tech.icon} mr-2 text-sm`} />
                <span className="text-xs">{tech.label}</span>
              </div>
            ))
          ) : (
            <span className="text-[#7b6f9f]">Aucune technologie sélectionnée</span>
          )}
        </div>
      ) : (
        <Select
          isMulti
          value={options.filter((opt) => value.includes(opt.value))}
          onChange={handleChange}
          options={options}
          isDisabled={isView}
          className="react-select-container text-[#F8F6FE]"
          classNamePrefix="react-select"
          components={{
            Option: customOption,
            SingleValue: CustomSingleValue,
            MultiValue: CustomMultiValue,
            DropdownIndicator: () => (
              <div style={{ color: '#F8F6FE' }}>
                <i className="fa-solid fa-caret-down text-xs mr-4"></i>
              </div>
            ),
          }}
          styles={{
            control: (provided, state) => ({
              ...provided,
              backgroundColor: '#1c1825',
              borderColor: state.isFocused ? '#484451' : '#484451',
              borderRadius: '0.375rem',
              padding: '0px 6px',
              minHeight: '48px', 
              boxShadow: state.isFocused
                ? '0 0 0 2px #1c1825, 0 0 0 4px #484451'
                : 'none',
              transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
              ':hover': {
                borderColor: '#484451',
                boxShadow: 'none',
              },
            }),
            multiValue: (provided) => ({
              ...provided,
              backgroundColor: '#1c1825',
              color: '#F8F6FE',
              borderRadius: '9999px',
              marginRight: '0.5rem',
              marginBottom: '0.5rem',
              marginTop: '0.5rem',
              padding: '0.2rem 0.5rem',
              display: 'flex',
              fontSize: '0.75rem',
              minHeight: '24px',
              overflow: 'hidden', 
            }),
            multiValueLabel: (provided) => ({
              ...provided,
              color: '#F8F6FE',
              fontSize: '0.75rem',
            }),
            multiValueRemove: (provided) => ({
              ...provided,
              color: '#F8F6FE',
              ':hover': {
                backgroundColor: '#e83058',
                color: '#F8F6FE',
              },
            }),
            
            dropdownIndicator: (provided) => ({
              ...provided,
              color: '#F8F6FE',
            }),
            indicatorSeparator: (provided) => ({
              ...provided,
              backgroundColor: '#1c1825',
            }),
            menu: (provided) => ({
              ...provided,
              backgroundColor: '#272334',
              borderColor: '#484451',
              borderRadius: '0.375rem',
            }),
            menuList: (provided) => ({
              ...provided,
              maxHeight: '300px',
              overflowY: 'auto', 
              '&:hover': {
                backgroundColor: '#272334',
                }
            }),
          }}
        />
      )}
    </div>
  );
};
