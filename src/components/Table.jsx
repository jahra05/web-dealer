function Table({ columns, data, renderActions, rowKey = 'id', onRowClick }) {
    return (
        <div className="w-full overflow-x-auto">
            <table className="w-full min-w-[500px] text-left text-sm">
                <thead className=" border-b border-b-green-50 text-gray-600">
                    <tr>
                        {columns.map((column) => (
                            <th key={column.key} className="px-5 py-4 font-semibold">
                                {column.label}
                            </th>
                        ))}
                        {/* {renderActions && (
                            <th className="px-5 py-4 font-semibold">
                                Aksi
                            </th>
                        )} */}
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    {data.length > 0 ? (
                        data.map((item) => (
                            <tr key={item[rowKey]} onClick={() => onRowClick?.(item)} className="transition-colors hover:bg-gray-50">
                                {columns.map((column) => (
                                    <td key={column.key} className="px-5 py-4 text-gray-700">
                                        {column.render ? column.render(item) : item[column.key]}
                                    </td>
                                ))}
                                {renderActions && (
                                    <td className="px-5 py-4">
                                        {renderActions(item)}
                                    </td>
                                )}
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={columns.length + (renderActions ? 1 : 0)} className="px-5 py-8 text-center text-gray-500">
                                Data belum tersedia
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default Table