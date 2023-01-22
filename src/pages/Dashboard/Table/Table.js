import axios from 'axios';
import React, { useEffect, useMemo, useState } from 'react'
import { useTable, useSortBy } from 'react-table'
import { COLUMNS, defaultColumn } from './columns'
import { useAuth } from '../../../authentication/auth';
const _ = require('lodash');
export const Table = (props) => {
    const columns = useMemo(() => COLUMNS, []);
    // const data = props.data;
    const [data, setData] = useState(props.data)
    const [originalData] = useState(data)
    const token = sessionStorage.getItem('access_token')
    const auth = useAuth();
    const [updatedData, setUpdatedData] = useState([])
    // const [originalData, setData] = useState(props.data)

    const updateChanges = async (data) => {
        try {
            const response = await axios.post(`${auth.baseURL}/api/update-status`, { updateData: data },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                })

        } catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        setUpdatedData(_.differenceWith(data, originalData, _.isEqual))
    }, [data])

    useEffect(() => {
        updateChanges(updatedData)
    }, [updatedData])
    const updateMyData = React.useCallback((rowIndex, columnId, value) => {
        // We also turn on the flag to not reset the page
        setData((old) =>
            old.map((row, index) => {
                if (index === rowIndex) {
                    return {
                        ...old[rowIndex],
                        [columnId]: value
                    };
                }
                return row;
            })
        );
    }, []);
    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({ columns, data, updateMyData, }, useSortBy)
    return (
        <table id='booking-info' {...getTableProps()}>
            <thead>
                {headerGroups.map((headerGroup) => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map((column) => (
                            <th className="sorting-arrow" {...column.getHeaderProps(column.getSortByToggleProps())}>
                                {column.render("Header")}
                                <span>
                                    {column.isSorted ? (column.isSortedDesc ? <i class="bi bi-caret-down-fill"></i> : <i class="bi bi-caret-up-fill"></i>) : ''}
                                </span>
                            </th>
                        ))}
                    </tr>
                ))}
            </thead>
            <tbody {...getTableBodyProps()}>
                {rows.map((row) => {
                    prepareRow(row);
                    return (
                        <tr {...row.getRowProps()}>
                            {row.cells.map((cell) => {
                                return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
                            })}
                        </tr>
                    );
                })}
            </tbody>
        </table>
    )
}
