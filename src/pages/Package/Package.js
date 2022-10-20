import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../../authentication/auth';
const Package = () => {
    const [allPackage, setAllPackage] = useState();
    const [renderApp, setRenderApp] = useState(false)
    const auth = useAuth();
    const loadData = async () => {
        axios.get(`${auth.baseURL}/api/get-package`).then((result) => {
            setAllPackage(result.data.data)
            console.log(result.data.data)
            setRenderApp(true)
        }).catch((err) => {
            console.log(err)
        })
    }


    const token = sessionStorage.getItem('access_token')
    useEffect(() => {
        loadData();
    }, [])

    const truncate = (str, max, suffix) => str.length < max ? str : `${str.substr(0, str.substr(0, max - suffix.length).lastIndexOf(' '))}${suffix}`;

    const deleteContact = async (id) => {
        const response = await axios.delete(`${auth.baseURL}/api/delete-package/${id}`,
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
        );
        console.log(response)
        if (response.status === 200) {
            toast.success("Packages Deleted Successfully")
            setTimeout(() => { loadData() }, 500)

        } else {
            toast.error("Packages Deleted UnSuccessfully")
            setTimeout(() => { loadData() }, 500)
        }
    }

    return (
        <div className=''>
            {renderApp && <>
                <h2 className='page-heading p-4'>Packages</h2>
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
                    <Link to="/add-package" className='btn my-4 add-btn'>Add Package</Link>
                </div>
                <div className="main-container">
                    <table class="table">
                        <thead class="table-dark">
                            <tr>
                                <th scope="col">Name</th>
                                <th scope="col">Location</th>
                                <th scope="col">Image</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {allPackage.map((packages) => (
                                <tr key={packages.id}>
                                    <td>{packages.title}</td>
                                    <td><div className='backend-small-text' dangerouslySetInnerHTML={{ __html: `${truncate(packages.description, 70, '...')}` }}></div></td>
                                    <td><a target="_blank" href={`${packages.image}`}>
                                        <img width={50} src={`${packages.image}`} />
                                    </a></td>
                                    <td>
                                        <Link to={`/edit-package/${packages.id}`} className='btn view-btn'>
                                            Edit
                                        </Link>
                                        <button onClick={() => { deleteContact(packages.id) }} className='btn delete-btn ms-3'>
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </>}

        </div>
    )
}

export default Package;
