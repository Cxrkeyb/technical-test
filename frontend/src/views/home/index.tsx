import { Form, FormikProvider } from 'formik';
import React from 'react';
import { FaSearch } from 'react-icons/fa';

import InputField from '@/components/common/forms/InputField';
import SelectField from '@/components/common/forms/SelectField';
import BasicDatePicker from '@/components/common/material-ui/BasicDatePicker';
import BasicTable from '@/components/common/table/BasicTable';
import PageEnumeration from '@/components/common/table/PageEnumeration';
import { FieldTypes } from '@/utils/constants';
import useClientsPagination from '@/views/home/hooks/useClientsPagination';
import useNewClientForm from '@/views/home/hooks/useNewClientForm';

export default function HomeView() {
  const {
    error,
    formik: formikNewClient,
    loading: loadingNewClient,
  } = useNewClientForm();
  const {
    clients,
    clearFilters,
    totalPages,
    formik: formikClients,
    createClient,
    setCreateClient,
    loading: loadingClients,
  } = useClientsPagination();

  return (
    <>
      {(loadingNewClient || loadingClients) && (
        <div className="flex items-center justify-center w-full h-full fixed top-0 left-0 bg-gray-600 bg-opacity-50 z-50">
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <p className="text-lg font-semibold">Cargando...</p>
          </div>
        </div>
      )}
      <div className="flex flex-col w-full items-center justify-center px-4 sm:px-6 lg:px-8">
        <div
          className={`flex flex-col gap-8 w-full ${
            createClient ? 'max-w-4xl' : 'max-w-7xl'
          } border shadow-xl container rounded-xl bg-white p-4 sm:p-6 lg:p-10 xl:p-16 relative my-16`}
        >
          <div className="flex flex-row justify-between items-center gap-4 w-full">
            <h1 className="text-xl sm:text-2xl font-bold">Clientes</h1>
            <button
              onClick={() => setCreateClient(!createClient)}
              className="bg-primary text-black rounded-full font-semibold py-2 px-4 hover:text-gray-500 transition-all duration-300 hover:scale-105 transform"
            >
              {createClient ? 'Ver clientes' : 'Crear cliente'}
            </button>
          </div>
          {createClient ? (
            <>
              <div className="bg-primary-foreground w-full p-3 text-black font-semibold text-center sm:text-left">
                Rellena la siguiente información
              </div>

              <FormikProvider value={formikNewClient}>
                <Form className="grid grid-cols-1 lg:grid-cols-6 gap-4 sm:gap-6 lg:gap-8 w-full">
                  <div className="col-span-1 lg:col-span-4">
                    <InputField
                      name="nombreCliente"
                      placeholder="Nombre del cliente"
                    />
                  </div>
                  <div className="col-span-1 lg:col-span-2 lg:col-start-1">
                    <SelectField
                      options={[
                        { value: 'CC', label: 'Cédula de ciudadanía' },
                        { value: 'CE', label: 'Cédula de extranjería' },
                        { value: 'NIT', label: 'NIT' },
                        { value: 'TI', label: 'Tarjeta de identidad' },
                        { value: 'PP', label: 'Pasaporte' },
                      ]}
                      name="tipoIdentificacion"
                      label="Tipo de identificación"
                    />
                  </div>
                  <div className="col-span-1 lg:col-span-3">
                    <InputField
                      name="numeroIdentificacion"
                      type={FieldTypes.number}
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

              {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 p-3 rounded mb-4">
                  <p>{error}</p>
                </div>
              )}
            </>
          ) : (
            <div className="flex flex-col w-full gap-8">
              <FormikProvider value={formikClients}>
                <div className="flex flex-col gap-8">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4 sm:flex-wrap w-full mb-4">
                      <div className="w-full sm:max-w-[400px]">
                        <InputField
                          placeholder="Buscar por ID"
                          name="id"
                          icon={<FaSearch className="text-gray-400" />}
                        />
                      </div>
                      <div className="w-full sm:max-w-[200px] mt-2 sm:mt-0">
                        <BasicDatePicker
                          label="Fecha de inicio"
                          name="startDate"
                          maxDate={
                            formikClients.values.endDate
                              ? typeof formikClients.values.endDate === 'string'
                                ? new Date(formikClients.values.endDate)
                                : formikClients.values.endDate
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
                        className="w-full sm:w-auto sm:max-w-[200px] mt-4 sm:mt-0 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
                        onClick={() => {
                          formikClients.resetForm();
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
                        'Nombre Cliente',
                        'Tipo Identificación',
                        'Número Identificación',
                        'Observaciones',
                      ]}
                      rows={clients}
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
