import { Form, FormikProvider } from 'formik';
import React from 'react';
import { FaSearch } from 'react-icons/fa';

import InputField from '@/components/common/forms/InputField';
import SelectField from '@/components/common/forms/SelectField';
import BasicDatePicker from '@/components/common/material-ui/BasicDatePicker';
import BasicTable from '@/components/common/table/BasicTable';
import PageEnumeration from '@/components/common/table/PageEnumeration';
import { FieldTypes } from '@/utils/constants';
import useBillsPagination from '@/views/facturas/hooks/useBillsPagination';
import useNewBillForm from '@/views/facturas/hooks/useNewBillForm';

export default function FacturaView() {
  const { error, formik, loading, clients } = useNewBillForm();
  const {
    bills,
    clearFilters,
    totalPages,
    formik: formikBills,
    createBill,
    setCreateBill,
  } = useBillsPagination();

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
        <div
          className={`flex flex-col gap-8 w-full ${
            createBill ? 'max-w-4xl' : 'max-w-7xl'
          } border shadow-xl container rounded-xl bg-white p-4 sm:p-6 lg:p-10 xl:p-16 relative my-16`}
        >
          <div className="flex flex-row justify-between items-center gap-4 w-full">
            <h1 className="text-xl sm:text-2xl font-bold">Facturas</h1>
            <button
              onClick={() => setCreateBill(!createBill)}
              className="bg-primary text-black rounded-full font-semibold py-2 px-4 hover:text-gray-500 transition-all duration-300 hover:scale-105 transform"
            >
              {createBill ? 'Ver facturas' : 'Crear factura'}
            </button>
          </div>
          {createBill ? (
            <>
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
            </>
          ) : (
            <div className="flex flex-col w-full gap-8">
              <FormikProvider value={formikBills}>
                <div className="flex flex-col gap-8">
                  {/* Filtros y botón para limpiar filtros */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4 sm:flex-wrap w-full mb-4">
                      <div className="w-full sm:max-w-[400px]">
                        <InputField
                          placeholder="Buscar por id de cliente"
                          name="id"
                          icon={<FaSearch className="text-gray-400" />}
                        />
                      </div>
                      <div className="w-full sm:max-w-[200px] mt-2 sm:mt-0">
                        <BasicDatePicker
                          label="Fecha de inicio"
                          name="startDate"
                          maxDate={
                            formikBills.values.endDate
                              ? typeof formikBills.values.endDate === 'string'
                                ? new Date(formikBills.values.endDate)
                                : formikBills.values.endDate
                              : undefined
                          }
                        />
                      </div>
                      <div className="w-full sm:max-w-[200px] mt-2 sm:mt-0">
                        <BasicDatePicker
                          label="Fecha de fin"
                          name="endDate"
                          maxDate={new Date()}
                        />
                      </div>
                      <button
                        type="button"
                        className="w-full sm:max-w-[200px] mt-4 sm:mt-0 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
                        onClick={() => {
                          formikBills.resetForm();
                          clearFilters();
                        }}
                      >
                        Limpiar filtros
                      </button>
                    </div>
                  </div>

                  {/* Tabla de datos */}
                  <div className="flex flex-col bg-white shadow-xl rounded-xl border w-full gap-4">
                    <BasicTable
                      headers={[
                        'ID',
                        'Nombre producto',
                        'Precio producto',
                        'Nombre cliente',
                        'Fecha factura',
                        'Porcentaje descuento',
                        'Porcentaje IVA',
                        'Total factura',
                      ]}
                      rows={bills}
                    />
                  </div>
                  <PageEnumeration totalPages={totalPages} />
                </div>
              </FormikProvider>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
