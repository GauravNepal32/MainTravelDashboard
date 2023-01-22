import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../../authentication/auth';
import Loading from '../Loading/Loading'
const Location = () => {
    const [allLocation, setAllLocation] = useState();
    const [renderApp, setRenderApp] = useState(false)
    const auth = useAuth();
    const loadData = async () => {
        axios.get(`${auth.baseURL}/api/get-location`).then((result) => {
            setAllLocation(result.data.data)
            setRenderApp(true)
        }).catch((err) => {
            console.log(err)
        })
    }


    const token = sessionStorage.getItem('access_token')
    useEffect(() => {
        loadData();
    }, [allLocation])

    const truncate = (str, max, suffix) => str.length < max ? str : `${str.substr(0, str.substr(0, max - suffix.length).lastIndexOf(' '))}${suffix}`;

    const deleteContact = async (id) => {
        const response = await axios.delete(`${auth.baseURL}/api/delete-location/${id}`,
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
        );
        if (response.status === 200) {
            toast.success("Locations Deleted Successfully")
            setTimeout(() => { loadData() }, 500)

        } else {
            toast.error("Locations Deleted UnSuccessfully")
            setTimeout(() => { loadData() }, 500)
        }
    }

    return (
        <div className=''>
            {renderApp ? <>
                <h2 className='page-heading p-4'>Locations</h2>
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
                <div className="text-end">
                    <Link to="/add-location" className='btn my-4 add-btn'>Add Locations</Link>
                </div>
                <div className="main-container">
                    <table class="table">
                        <thead class="table-dark">
                            <tr>
                                <th scope="col">Name</th>
                                <th scope="col">Description</th>
                                <th scope="col">Image</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {allLocation.map((location) => (
                                <tr key={location.id}>
                                    <td>{location.name}</td>
                                    <td><div className='backend-small-text' dangerouslySetInnerHTML={{ __html: `${truncate(location.description, 70, '...')}` }}></div></td>
                                    <td><a target="_blank" href={`${location.thumbnail}`}>
                                        <img width={50} src={`${location.thumbnail}`} />
                                    </a></td>
                                    <td>
                                        <Link to={`/edit-location/${location.id}`} className='btn view-btn'>
                                            Edit
                                        </Link>
                                        <button onClick={() => { deleteContact(location.id) }} className='btn delete-btn ms-3'>
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </>
                :
                <Loading />
            }

        </div>
    )
}

export default Location;
