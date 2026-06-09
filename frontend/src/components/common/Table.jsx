const Table = ({ columns, data, onRowClick }) => {
  return (
    <div className="bg-white rounded-xl border overflow-hidden" style={{ borderColor: '#E5E7EB' }}>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b" style={{ borderColor: '#E5E7EB' }}>
              {columns.map((col, index) => (
                <th
                  key={index}
                  className="px-5 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider"
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className="border-b hover:bg-gray-50 transition-colors"
                style={{ borderColor: '#F3F4F6' }}
                onClick={() => onRowClick && onRowClick(row)}
              >
                {columns.map((col, colIndex) => (
                  <td
                    key={colIndex}
                    className={`px-5 py-4 text-sm text-gray-700 ${
                      onRowClick ? 'cursor-pointer' : ''
                    }`}
                  >
                    {col.render ? col.render(row[col.accessor], row) : row[col.accessor]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
