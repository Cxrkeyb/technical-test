import axios, { isAxiosError } from 'axios';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import * as yup from 'yup';

import settings from '@/settings';

// Interfaz para los parámetros de búsqueda de facturas
interface BillSearch {
  startDate: string | null;
  endDate: string | null;
  id: string | null;
  page: number;
  limit: number;
}

// Esquema de validación para el formulario
const validationSchema = yup.object().shape({
  startDate: yup.date().nullable().optional(),
  endDate: yup
    .date()
    .nullable()
    .test(
      'is-valid-end-date',
      'La fecha final no puede ser anterior a la fecha inicial',
      function (value) {
        const { startDate } = this.parent;
        return !startDate || !value || value >= startDate;
      },
    )
    .optional(),
});

// Hook para la paginación y filtrado de facturas
const useBillsPagination = () => {
  const [bills, setBills] = useState<any[]>([]);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [createBill, setCreateBill] = useState(true);

  const initialValues: BillSearch = {
    startDate: null,
    endDate: null,
    id: null,
    page: 1,
    limit: 10,
  };

  const formik = useFormik<BillSearch>({
    initialValues,
    validationSchema,
    onSubmit: (values) => handleSubmit(values),
  });

  const handleSubmit = async (data: BillSearch) => {
    const { startDate, endDate, page, id, limit } = data;
    setLoading(true);
    setError(null);
    try {
      const startDateFormatted = startDate
        ? new Date(startDate).toLocaleDateString('es-ES')
        : null;

      const endDateFormatted = endDate
        ? new Date(endDate).toLocaleDateString('es-ES')
        : null;

      const response = await axios.get(
        `${settings.API_URL}v1/facturas/paginacion`,
        {
          params: {
            startDate: startDateFormatted,
            endDate: endDateFormatted,
            id: id || undefined,
            page,
            limit,
          },
        },
      );

      if (response.data) {
        setBills(response.data.data);
        setTotalPages(Math.ceil(response.data.total / limit));
      }
    } catch (errorResponse) {
      if (isAxiosError(errorResponse) && errorResponse.response) {
        setError(
          errorResponse.response.data.message ||
            'Error al obtener las facturas',
        );
        Swal.fire({
          title: 'Error',
          text:
            errorResponse.response.data.message ||
            'Error al obtener las facturas',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      } else {
        setError('Error al obtener las facturas');
        Swal.fire({
          title: 'Error',
          text: 'Error al obtener las facturas',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleSubmit(initialValues);
  }, []);

  useEffect(() => {
    handleSubmit(formik.values);
  }, [formik.values]);

  useEffect(() => {
    if (!createBill) {
      handleSubmit(formik.values);
      setCreateBill(false);
    }
  }, [createBill]);

  const clearFilters = () => {
    formik.resetForm();
  };

  return {
    formik,
    bills,
    loading,
    error,
    clearFilters,
    totalPages,
    setCreateBill,
    createBill,
  };
};

export default useBillsPagination;
