const TableHeader: React.FC<{
  headers: string[];
  edit: boolean | undefined;
  remove: boolean | undefined;
}> = ({ headers, edit, remove }) => {
  return (
    <thead className="bg-gray-50">
      <tr>
        {headers.map((header, index) => (
          <th
            key={index}
            scope="col"
            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            {header}
          </th>
        ))}
        {edit && <th scope="col" className="relative p-2"></th>}
        {remove && <th scope="col" className="relative p-2"></th>}
      </tr>
    </thead>
  );
};
export default TableHeader;
