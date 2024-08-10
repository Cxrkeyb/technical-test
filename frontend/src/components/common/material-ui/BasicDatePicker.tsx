import { DesktopDatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import { useFormikContext } from 'formik';
import React from 'react';

interface FormValues {
  [key: string]: any; // Aquí debes especificar los tipos de las propiedades de values si es posible
}

interface BasicDatePickerProps {
  name: string;
  label: string;
  maxDate?: Date;
  minDate?: Date;
}

const BasicDatePicker = ({
  name,
  label,
  maxDate,
  minDate,
}: BasicDatePickerProps) => {
  const { setFieldValue, values } = useFormikContext<FormValues>(); // Aquí especificamos el tipo de values

  const handleChange = (date: dayjs.Dayjs | null) => {
    const dateValue = date ? date.toDate() : null;
    setFieldValue(name, dateValue);
  };

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DesktopDatePicker
          label={label}
          value={values[name] ? dayjs(values[name]) : null}
          onChange={handleChange}
          className="w-full border-black"
          format="DD/MM/YYYY"
          sx={{
            '& .MuiInputBase-root': {
              height: '3.2rem',
            },
          }}
          slotProps={{
            textField: { size: 'medium' },
          }}
          maxDate={
            maxDate
              ? dayjs(maxDate) // Convertir Date a Dayjs
              : dayjs().add(100, 'year') // Si no se proporciona maxDate, establecer 100 años en el futuro
          }
          minDate={
            minDate
              ? dayjs(minDate) // Convertir Date a Dayjs
              : dayjs().subtract(100, 'year') // Si no se proporciona minDate, establecer 100 años en el pasado
          }
        />
      </LocalizationProvider>
    </>
  );
};

export default BasicDatePicker;
