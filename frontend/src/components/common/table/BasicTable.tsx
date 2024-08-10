import { TableRow } from '@/utils/constants';

import TableBody from './TableBody';
import TableHeader from './TableHeader';

interface BasicTableProps {
  headers: string[];
  rows: TableRow[];
  remove?: boolean;
  edit?: boolean;
  editFunction?: (id: string) => void;
  removeFunction?: (id: string) => void;
}

const BasicTable: React.FC<BasicTableProps> = ({
  headers,
  rows,
  remove,
  edit,
  editFunction,
  removeFunction,
}) => {
  return (
    <div className="w-full border-b">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <TableHeader headers={headers} edit={edit} remove={remove} />
          <TableBody
            rows={rows}
            edit={edit}
            remove={remove}
            editFunction={editFunction}
            removeFunction={removeFunction}
          />
        </table>
      </div>
      {rows.length === 0 && (
        <div className="flex justify-center items-center h-96">
          <span className="text-gray-500 text-2xl font-semibold">
            No hay datos para mostrar
          </span>
        </div>
      )}
    </div>
  );
};

export default BasicTable;
