import { Form, FormikProvider } from 'formik';
import React from 'react';

import InputField from '@/components/common/forms/InputField';
import SelectField from '@/components/common/forms/SelectField';
import { FieldTypes } from '@/utils/constants';
import useNewClientForm from '@/views/home/hooks/useNewClientForm';

export default function HomeView() {
  const { error, formik, loading } = useNewClientForm();

  const options = [
    { value: 'CC', label: 'Cédula de ciudadanía' },
    { value: 'CE', label: 'Cédula de extranjería' },
    { value: 'NIT', label: 'NIT' },
    { value: 'TI', label: 'Tarjeta de identidad' },
    { value: 'PP', label: 'Pasaporte' },
  ];

  return (
    <>
      {loading && (
        <div className="flex items-center justify-center w-full h-full fixed top-0 left-0 bg-gray-600 bg-opacity-50 z-50">
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <p className="text-lg font-semibold">Cargando...</p>
          </div>
        </div>
      )}
      <div className="flex flex-col w-full items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 w-full max-w-4xl border shadow-xl container rounded-xl bg-white p-4 sm:p-6 lg:p-10 xl:p-16">
          <h1 className="text-xl sm:text-2xl font-bold">Clientes</h1>
          <div className="bg-primary-foreground w-full p-3 text-black font-semibold text-center sm:text-left">
            Rellena la siguiente información
          </div>
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 p-3 rounded mb-4">
              <p>{error}</p>
            </div>
          )}
          <FormikProvider value={formik}>
            <Form className="grid grid-cols-1 lg:grid-cols-6 gap-4 sm:gap-6 lg:gap-8 w-full">
              <div className="col-span-1 lg:col-span-4">
                <InputField
                  name="nombreCliente"
                  placeholder="Nombre del cliente"
                />
              </div>
              <div className="col-span-1 lg:col-span-2 lg:col-start-1">
                <SelectField
                  options={options}
                  name="tipoIdentificacion"
                  label="Tipo de identificación"
                />
              </div>
              <div className="col-span-1 lg:col-span-3">
                <InputField
                  name="numeroIdentificacion"
                  placeholder="Número de identificación"
                />
              </div>
              <div className="col-span-1 lg:col-span-6">
                <InputField
                  name="observaciones"
                  placeholder="Observaciones"
                  type={FieldTypes.text}
                  rows={3}
                />
              </div>
              <div className="col-span-1 lg:col-span-6">
                <div className="flex flex-row justify-end gap-4">
                  <button
                    className="bg-primary text-black rounded-full font-semibold py-2 px-4 hover:text-gray-500 transition-all duration-300 hover:scale-105 transform"
                    type="submit"
                  >
                    Guardar cliente
                  </button>
                </div>
              </div>
            </Form>
          </FormikProvider>
        </div>
      </div>
    </>
  );
}
