import { format } from 'date-fns'
import React, { useState, useMemo } from 'react'
import Select from 'react-select'
const cellOptions = [
    { value: 'pending', label: 'Pending' },
    { value: 'confirmed', label: 'Confirmed' },
    { value: 'cancelled', label: 'Cancelled' }
]

export const SelectCell = React.memo(({
    value,
    index,
    id,
    updateMyData
}) => {
    const onChange = (e) => {
        <div class="modal" tabindex="-1">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Modal title</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <p>Modal body text goes here.</p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary">Save changes</button>
                    </div>
                </div>
            </div>
        </div>
        updateMyData(index, id, e.value);
    };

    return (
        <Select
            options={cellOptions}
            components={{ IndicatorSeparator: () => null }}
            isSearchable={false}
            value={cellOptions.find((option) => option.value === value)}
            onChange={onChange}
        />
    );
});
export function SelectCellWithMemory(props) {

    return (<SelectCell index={props.row.index} id={props.column.id} value={props.value} updateMyData={props.updateMyData} />)

}
export const defaultColumn = {
    Cell: SelectCellWithMemory
};
export const COLUMNS = [
    {
        Header: 'ID',
        accessor: 'id'
    }, {
        Header: 'Package Name',
        accessor: 'title'
    }, {
        Header: 'Booked For',
        accessor: 'booking_date',
        Cell: ({ value }) => {
            return format(new Date(value), "dd/MM/yyyy");
        }
    },
    {
        Header: 'Guests',
        accessor: 'guests'
    }, {
        Header: 'Contact Name',
        accessor: 'contact_name'
    },
    {
        Header: 'Contact Email',
        accessor: 'contact_email'
    },
    {
        Header: 'Status',
        accessor: 'status',
        Cell: SelectCellWithMemory
    }
]