import { format, isValid, parseISO } from 'date-fns';
import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';

import { TableRow } from '@/utils/constants';

const TableBody: React.FC<{
  rows: TableRow[];
  edit: boolean | undefined;
  remove: boolean | undefined;
  editFunction: ((id: string) => void) | undefined;
  removeFunction: ((id: string) => void) | undefined;
}> = ({ rows, remove, edit, editFunction, removeFunction }) => {
  return (
    <tbody className="bg-white divide-y divide-gray-200">
      {rows.map((row, rowIndex) => (
        <tr key={rowIndex} className="bg-white">
          {Object.values(row).map((value, colIndex) => {
            // Verificar si el valor es una URL o base64
            const isURLorBase64 =
              typeof value === 'string' &&
              (value.startsWith('http') || value.startsWith('data:image'));

            return (
              <td
                key={colIndex}
                className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
              >
                {value === null ? (
                  'No hay datos'
                ) : isURLorBase64 ? (
                  <picture>
                    <img
                      src={value}
                      alt="imagen"
                      className="w-10 h-10 object-cover rounded-full"
                    />
                  </picture>
                ) : typeof value === 'string' && isValid(parseISO(value)) ? (
                  format(parseISO(value), 'dd/MM/yyyy')
                ) : (
                  value.toString().slice(0, 40) +
                  (value.toString().length > 40 ? '...' : '')
                )}
              </td>
            );
          })}
          {edit && (
            <td className="bg-white">
              <FaEdit
                className="text-primary-background text-xl hover:text-yellow-600 cursor-pointer"
                onClick={() => editFunction && editFunction(row.id)}
              />
            </td>
          )}
          {remove && (
            <td className="bg-white">
              <MdDelete
                className="text-primary-background text-xl hover:text-red-500 cursor-pointer"
                onClick={() => removeFunction && removeFunction(row.id)}
              />
            </td>
          )}
        </tr>
      ))}
    </tbody>
  );
};
export default TableBody;
