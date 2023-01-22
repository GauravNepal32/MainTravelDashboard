import React, { useState } from 'react'
import axios from 'axios'
import { useAuth } from '../../authentication/auth';
import { ToastContainer, toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';

const EditDay = (props) => {
    const [dayChange, setDayChange] = useState(props.day)
    const [descChange, setDescChange] = useState(props.description)
    const token = sessionStorage.getItem('access_token')
    const auth = useAuth();

    const handleDelete = async (e) => {
        e.preventDefault();
        const id = props.id
        try {
            const response = await axios.delete(`${auth.baseURL}/api/delete-day/${id}`
                , {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }

            )
            toast.success('Data Deleted successfully', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            props.loadData();
        } catch (err) {
            console.log(err)
        }
    }
    const handleSave = async (e) => {
        const id = props.id
        e.preventDefault();
        try {
            const response = await axios.post(`${auth.baseURL}/api/update-day/${id}`, { day: dayChange, description: descChange }
                , {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }
            )
            if (response.status === 200) {
                toast.success('Data Edited successfully', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            } else {
                toast.success('Couldnot update data', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <div className="bg-white p-4 mb-3 rounded">
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            <div key={props.index}>
                <input
                    id='edit-day'
                    value={dayChange}
                    onChange={(e) => { setDayChange(e.target.value) }}
                    name='day'
                    type='number'
                    className='form-control'
                    placeholder='Day Number'

                />
                <textarea
                    id='edit-desc'
                    className='form-control mt-3'
                    name='description'
                    placeholder='Description about the day'
                    value={descChange}
                    onChange={(e) => { setDescChange(e.target.value) }}
                />
            </div>
            <div className="text-end">
                <button onClick={(e) => { handleSave(e) }} className="ms-auto btn btn-success mt-2 me-3">Save</button>
                <button onClick={handleDelete} className="ms-auto btn btn-danger mt-2">Delete</button>
            </div>
        </div>
    )
}

export default EditDay