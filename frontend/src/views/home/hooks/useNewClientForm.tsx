import axios, { isAxiosError } from 'axios'; // Biblioteca para solicitudes HTTP y verificación de errores
import { useFormik } from 'formik'; // Hook para gestionar formularios
import { useState } from 'react'; // Hook para gestionar el estado del componente
import Swal from 'sweetalert2'; // Importa SweetAlert2
import * as yup from 'yup'; // Biblioteca para validación de esquemas

import settings from '@/settings';

// Interfaz que define la estructura de los datos del cliente
interface NewClient {
  nombreCliente: string;
  tipoIdentificacion: string;
  numeroIdentificacion: string;
  observaciones?: string;
}

// Esquema de validación para los datos del formulario
const validationSchema = yup.object().shape({
  nombreCliente: yup.string().required('Este campo es obligatorio'),
  tipoIdentificacion: yup.string().required('Este campo es obligatorio'),
  numeroIdentificacion: yup.string().required('Este campo es obligatorio'),
  observaciones: yup.string().max(1000, 'Las observaciones son muy largas'),
});

// Hook personalizado para gestionar el formulario del cliente
const useNewClientForm = () => {
  const [loading, setLoading] = useState<boolean>(false); // Estado para manejar la carga
  const [error, setError] = useState<string | null>(null); // Estado para manejar errores

  // Función para enviar los datos del cliente al servidor
  const submitClientData = async (values: NewClient) => {
    setLoading(true); // Activar el estado de carga
    setError(null); // Limpiar errores previos
    try {
      const response = await axios.post(
        `${settings.API_URL}v1/clientes/`,
        values,
      ); // Enviar datos al servidor
      console.log('Cliente creado:', response.data); // Mostrar datos recibidos

      // Muestra un mensaje de éxito con SweetAlert
      Swal.fire({
        title: 'Cliente Creado',
        text: 'El cliente ha sido creado exitosamente.',
        icon: 'success',
        confirmButtonText: 'OK',
      });
      // Limpiar el formulario
      formik.resetForm();
    } catch (errorResponse) {
      if (isAxiosError(errorResponse) && errorResponse.response) {
        setError(
          errorResponse.response.data.message || 'Error al crear el cliente',
        ); // Mostrar error del servidor

        // Muestra un mensaje de error con SweetAlert
        Swal.fire({
          title: 'Error',
          text:
            errorResponse.response.data.message || 'Error al crear el cliente',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      } else {
        setError('Error al crear el cliente'); // Mostrar error genérico

        // Muestra un mensaje de error genérico con SweetAlert
        Swal.fire({
          title: 'Error',
          text: 'Error al crear el cliente',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      }
    } finally {
      setLoading(false); // Desactivar el estado de carga
    }
  };

  // Configurar Formik
  const formik = useFormik<NewClient>({
    initialValues: {
      nombreCliente: '',
      tipoIdentificacion: '',
      numeroIdentificacion: '',
      observaciones: '',
    },
    validationSchema, // Aplicar esquema de validación
    onSubmit: (values) => {
      submitClientData(values); // Llamar a la función de envío de datos
    },
  });

  // Retornar Formik y estados de carga y error
  return { formik, loading, error };
};

export default useNewClientForm; // Exportar el hook para su uso en otros componentes
