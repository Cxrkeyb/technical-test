import { ErrorMessage, Field, useFormikContext } from 'formik';
import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

interface Option {
  value: string;
  label: string;
}

interface SelectFieldProps {
  label: string;
  customLabel?: React.ReactNode;
  extraInfo?: React.ReactNode;
  name: string;
  options: Option[];
  disabled?: boolean;
  defaultValue?: string;
  className?: string;
}

const SelectField: React.FC<SelectFieldProps> = ({
  label,
  name,
  customLabel,
  options,
  extraInfo,
  disabled,
  defaultValue,
  className,
  ...rest
}) => {
  const formikContext = useFormikContext();
  const { values } = formikContext as { values: Record<string, unknown> };
  const [fieldId, setFieldId] = useState('');

  useEffect(() => {
    const nameId = uuidv4();
    setFieldId(nameId);
  }, [name]);

  const handleClickLabel = () => {
    const field = document.getElementById(fieldId) as HTMLSelectElement;
    if (field) {
      field.focus();
    }
  };

  const labelClass = `font-semibold absolute cursor-pointer peer -top-1 bg-white h-2 px-2 text-2xs text-sm text-gray-600 text-center flex items-center transition-all duration-300 select-none left-2`;

  return (
    <div className="w-full">
      <div className="group relative w-full">
        {customLabel ? (
          customLabel
        ) : (
          <label
            htmlFor={name}
            className={labelClass}
            onClick={handleClickLabel}
          >
            {label}
          </label>
        )}
        <Field
          as="select"
          id={fieldId}
          name={name}
          {...rest}
          className={`w-full py-4 px-2 border border-black rounded-md outline-none ${className} ${
            customLabel ? 'py-1 pt-1' : 'pt-4'
          }
            ${values[name] === '' ? 'text-gray-500' : 'text-black'}  
          `}
          disabled={disabled}
        >
          <option value="">
            {defaultValue ? defaultValue : 'Selecciona una opción'}
          </option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Field>
      </div>
      {extraInfo && <span className="text-gray-500 text-sm">{extraInfo}</span>}
      <ErrorMessage
        name={name}
        component="div"
        className="error text-red-400"
      />
    </div>
  );
};

export default SelectField;
