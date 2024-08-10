import axios, { isAxiosError } from 'axios';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import * as yup from 'yup';

import settings from '@/settings';

interface NewBill {
  clienteId: string;
  fecha: string;
  nombreProducto: string;
  precio: number;
  valorDescuento?: number;
  iva?: number;
  valorTotal: number;
}

interface Cliente {
  label: string;
  value: string;
}

const validationSchema = yup.object().shape({
  clienteId: yup.string().required('Este campo es obligatorio'),
  fecha: yup.string().required('Este campo es obligatorio'),
  nombreProducto: yup
    .string()
    .required('Este campo es obligatorio')
    .max(150, 'El nombre del producto es muy largo'),
  precio: yup
    .number()
    .required('Este campo es obligatorio')
    .positive('Debe ser un valor positivo'),
  valorDescuento: yup
    .number()
    .min(0, 'El descuento no puede ser negativo')
    .max(100, 'El valor del descuento no puede ser mayor al 50%')
    .nullable(),
  iva: yup
    .number()
    .min(0, 'El IVA no puede ser negativo')
    .max(100, 'El valor del IVA no puede ser mayor al 100%')
    .nullable(),
  valorTotal: yup
    .number()
    .required('Este campo es obligatorio')
    .positive('Debe ser un valor positivo'),
});

const useNewBillForm = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [clients, setClients] = useState<Cliente[]>([]);

  useEffect(() => {
    const fetchClients = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get<Cliente[]>(
          `${settings.API_URL}v1/clientes/`,
        );
        setClients(response.data);
      } catch (errorResponse) {
        if (isAxiosError(errorResponse) && errorResponse.response) {
          setError(
            errorResponse.response.data.message ||
              'Error al obtener los clientes',
          );
        } else {
          setError('Error al obtener los clientes');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchClients();
  }, []);

  const submitBillData = async (values: NewBill) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(
        `${settings.API_URL}v1/facturas/`,
        values,
      );
      console.log('Factura creada:', response.data);

      Swal.fire({
        title: 'Factura Creada',
        text: 'La factura ha sido creada exitosamente.',
        icon: 'success',
        confirmButtonText: 'OK',
      });

      formik.resetForm();
    } catch (errorResponse) {
      if (isAxiosError(errorResponse) && errorResponse.response) {
        setError(
          errorResponse.response.data.message || 'Error al crear la factura',
        );

        Swal.fire({
          title: 'Error',
          text:
            errorResponse.response.data.message || 'Error al crear la factura',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      } else {
        setError('Error al crear la factura');

        Swal.fire({
          title: 'Error',
          text: 'Error al crear la factura',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const formik = useFormik<NewBill>({
    initialValues: {
      clienteId: '',
      fecha: '',
      nombreProducto: '',
      precio: 0,
      valorDescuento: 0,
      iva: 19,
      valorTotal: 0,
    },
    validationSchema,
    onSubmit: (values) => {
      submitBillData(values);
    },
  });

  useEffect(() => {
    if (
      formik.errors.precio ||
      formik.errors.valorDescuento ||
      formik.errors.iva
    ) {
      return;
    }

    const precio = formik.values.precio;
    const valorDescuento = formik.values.valorDescuento || 0;
    const iva = formik.values.iva || 0;

    const total =
      precio - (precio * valorDescuento) / 100 + (precio * iva) / 100;

    formik.setFieldValue('valorTotal', total);
  }, [formik.values.precio, formik.values.valorDescuento, formik.values.iva]);

  useEffect(() => {
    if (formik.values.valorDescuento && formik.values.valorDescuento < 0) {
      setError('El descuento no puede ser negativo');
      return;
    }
    if (formik.values.valorDescuento && formik.values.valorDescuento > 50) {
      setError('El descuento no puede ser mayor al 50%');
      return;
    }

    setError(null);
  }, [formik.values.valorDescuento]);

  return { formik, loading, error, clients };
};

export default useNewBillForm;
