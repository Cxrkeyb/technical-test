import { Form, FormikProvider } from 'formik';
import React from 'react';

import InputField from '@/components/common/forms/InputField';
import SelectField from '@/components/common/forms/SelectField';
import BasicDatePicker from '@/components/common/material-ui/BasicDatePicker';
import { FieldTypes } from '@/utils/constants';
import useNewBillForm from '@/views/facturas/hooks/useNewBillForm';

export default function FacturaView() {
  const { error, formik, loading, clients } = useNewBillForm();

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
        <div className="flex flex-col gap-8 w-full max-w-4xl border shadow-xl container rounded-xl bg-white p-4 sm:p-6 lg:p-10 xl:p-16 relative">
          <div className="flex flex-row justify-between items-center gap-4 w-full">
            <h1 className="text-xl sm:text-2xl font-bold">Facturas</h1>
          </div>
          <div className="bg-primary-foreground w-full p-3 text-black font-semibold text-center sm:text-left">
            Rellena la siguiente información
          </div>

          <FormikProvider value={formik}>
            <Form className="grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-12 lg:gap-8 w-full">
              <div className="col-span-1 lg:col-span-6">
                <SelectField
                  name="clienteId"
                  label="Cliente"
                  options={clients}
                />
              </div>
              <div className="col-span-1 lg:col-span-4">
                <BasicDatePicker name="fecha" label="Fecha de la factura" />
              </div>
              <div className="col-span-1 lg:col-span-5">
                <InputField
                  name="nombreProducto"
                  placeholder="Nombre del producto"
                  type={FieldTypes.text}
                />
              </div>
              <div className="col-span-1 lg:col-span-3">
                <InputField
                  name="precio"
                  placeholder="Precio"
                  type={FieldTypes.number}
                />
              </div>
              <div className="col-span-1 lg:col-span-4 lg:col-start-1">
                <InputField
                  name="valorDescuento"
                  placeholder="Valor de descuento"
                  type={FieldTypes.number}
                />
              </div>
              <div className="col-span-1 lg:col-span-3">
                <InputField
                  name="iva"
                  placeholder="IVA"
                  disabled
                  type={FieldTypes.number}
                />
              </div>
              <div className="col-span-1 lg:col-span-12">
                <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
                  <div className="flex flex-row gap-2 rounded-lg p-4">
                    <p className="text-lg font-semibold">
                      Valor total de la factura:
                    </p>
                    <p className="text-lg">{formik.values.valorTotal}</p>
                  </div>
                  <button
                    className="bg-primary text-black rounded-full font-semibold py-2 px-4 hover:text-gray-500 transition-all duration-300 hover:scale-105 transform"
                    type="submit"
                  >
                    Enviar factura
                  </button>
                </div>
              </div>
            </Form>
          </FormikProvider>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 p-3 rounded mb-4">
              <p>{error}</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
