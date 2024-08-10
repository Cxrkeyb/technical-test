import { Field, FormikValues, useFormikContext } from 'formik';
import React, { useEffect, useState } from 'react';
import { TiDelete } from 'react-icons/ti';
import { v4 as uuidv4 } from 'uuid';

import { FieldTypes } from '@/utils/constants';

interface InputFieldProps {
  name: string;
  placeholder: string;
  icon?: React.ReactNode;
  iconFunction?: () => void;
  deleteIcon?: boolean;
  type?: FieldTypes;
  className?: string;
  rows?: number;
  customLabel?: React.ReactNode;
  extraInfo?: React.ReactNode;
  disabled?: boolean;
  onChangeFn?: () => void;
}

const InputField = ({
  name,
  placeholder,
  icon,
  iconFunction,
  deleteIcon,
  type = FieldTypes.text,
  className,
  rows = 0,
  customLabel,
  extraInfo,
  disabled,
  onChangeFn,
}: InputFieldProps) => {
  const formikContext = useFormikContext<FormikValues>();
  const { values } = formikContext;
  const [fieldHasValue, setFieldHasValue] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [fieldId, setFieldId] = useState('');

  useEffect(() => {
    if (
      values[name] !== undefined &&
      values[name] !== null &&
      values[name] !== ''
    ) {
      setFieldHasValue(true);
    } else {
      setFieldHasValue(false);
    }
  }, [values[name]]);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    // Solo permitir números y el punto decimal si el type es "number"
    if (type === FieldTypes.number && !/^\d*\.?\d*$/.test(event.key)) {
      event.preventDefault();
    }
  };

  useEffect(() => {
    const nameId = uuidv4();
    setFieldId(nameId);
  }, [name]);

  const handleClickLabel = () => {
    const field = document.getElementById(fieldId) as HTMLInputElement;
    if (field) {
      field.focus();
    }
  };

  const labelClass = `font-semibold absolute cursor-pointer peer ${
    fieldHasValue || isFocused
      ? '-top-1 bg-white h-2 px-2 text-2xs text-sm text-gray-600 text-center flex items-center'
      : ''
  } ${
    !fieldHasValue && !isFocused && rows > 0
      ? 'top-3 text-sm text-gray-500'
      : ''
  } ${
    !fieldHasValue && !isFocused && rows <= 0
      ? 'top-1/2 transform -translate-y-1/2 text-sm text-gray-500'
      : ''
  } transition-all duration-300 select-none left-2`;

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
            {placeholder}
          </label>
        )}
        <Field
          id={fieldId}
          className={`w-full py-4 px-2 border border-black rounded-md outline-none resize-none ${className} ${
            customLabel ? 'py-1 pt-1' : 'pt-4'
          }`}
          onChange={(e: any) => {
            setFieldHasValue(true);
            formikContext.setFieldValue(name, e.target.value);
            if (onChangeFn) {
              onChangeFn();
            }
          }}
          name={name}
          onFocus={handleFocus}
          onBlur={handleBlur}
          type={type}
          component={rows > 0 ? 'textarea' : 'input'}
          rows={rows}
          onKeyPress={handleKeyPress}
          disabled={disabled}
        />
        {deleteIcon && fieldHasValue && (
          <div
            className={`absolute inset-y-0 ${icon ? 'right-10' : 'right-2'}  flex items-center pr-2 cursor-pointer text-2xl text-gray-500 hover:text-gray-800 transition-colors duration-300`}
            onClick={() => formikContext.setFieldValue(name, '')}
          >
            <TiDelete />
          </div>
        )}
        {icon && (
          <div
            className={`absolute inset-y-0 right-2 flex items-center px-2 cursor-pointer my-2 ${deleteIcon && fieldHasValue && 'border-l'}`}
            onClick={iconFunction ? iconFunction : handleClickLabel}
          >
            {icon}
          </div>
        )}
      </div>
      {extraInfo && <span className="text-gray-500 text-sm">{extraInfo}</span>}
    </div>
  );
};

export default InputField;
