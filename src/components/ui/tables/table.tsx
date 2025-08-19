
import { type JSX } from 'react';

interface ITableProps {
    columns: { key: string; label: string, customRowComponent?: (props: any) => JSX.Element }[];
    data: Record<string, any>[];
    rowProps?: Record<string, any>;
}

const Table = (props: ITableProps) => {
    const { columns, data, rowProps } = props;

    return (
        <div className="bg-white rounded-sm shadow-sm border border-gray-50 overflow-hidden w-full">
            <div className="overflow-x-auto">
                <table className="min-w-full">
                <thead className="bg-gray-50 shadow" >
                    <tr>
                        {columns.map(column => (
                            <th key={column.key} className="text-left p-2 sm:p-4 font-semibold text-gray-900 min-w-[100px] sm:min-w-[120px] text-sm sm:text-base">
                                {column.label}
                            </th>
                        ))}
                    </tr>
                </thead>

                <tbody>
                    {data.length ? (
                        <>
                            {data.map(item => (
                                <tr key={item.id} className="border-t border-t-gray-300 hover:bg-gray-50 transition-colors">
                                    {columns.map(column => (
                                        <td key={column.key} className="p-2 sm:p-4 text-gray-600 min-w-[100px] sm:min-w-[120px] text-sm sm:text-base">
                                            {column.customRowComponent ? (
                                                <column.customRowComponent data={item} {...rowProps} />
                                            ) : (
                                                item[column.key]
                                            )}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </>
                    ) : (
                        <tr>
                            <td colSpan={columns.length} className="p-2 sm:p-4 text-center text-gray-500 min-w-[100px] sm:min-w-[120px] text-sm sm:text-base">
                                No data available
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
            </div>
        </div>
    );
};

export default Table;
